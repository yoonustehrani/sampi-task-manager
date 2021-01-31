<?php

namespace App\Http\Controllers\Api;

use App\Task;
use App\Workspace;
use Illuminate\Http\Request;

class TaskController extends BaseController
{
    protected $default_group = 'دسته بندی نشده';
    public function index(Request $request, $workspace)
    {
        $request->validate([
            'limit' => 'nullable|numeric',
            'order' => 'nullable|string',
            'group' => 'nullable|string',
            'order_by' => 'nullable|string'
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $relationship = $this->model_relationship($request->relationship, $user, '_tasks', 'tasks');
        $user_tasks = $user->{$relationship}()
                    ->whereNull('parent_id')
                    ->with('users')
                    ->withCount('demands', 'children')
                    ->where('workspace_id', $workspace);
        // $group = $request->group ?: $this->default_group;
        // $user_tasks = $user_tasks->where('group', '=', $group);
        return $request->limit
                ? $this->decide_ordered($request, $user_tasks)->limit((int) $request->limit)->get()
                : $this->decide_ordered($request, $user_tasks)->latest()->paginate(10);
    }
    public function mixed(Request $request)
    {
        $request->validate([
            'limit' => 'nullable|numeric',
            'order' => 'nullable|string',
            'order_by' => 'nullable|string'
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $relationship = $this->model_relationship($request->relationship, $user, '_tasks', 'tasks');
        $user_tasks = $user->{$relationship}()
                    ->whereNull('parent_id')
                    ->with(['users','workspace:id,title,avatar_pic'])
                    ->withCount('demands', 'children');
        return $request->limit
            ? $this->decide_ordered($request, $user_tasks)->limit((int) $request->limit)->get()
            : $this->decide_ordered($request, $user_tasks)->paginate(10);
    }
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|min:3|max:60',
            'order_by' => 'nullable|string',
            'limit' => 'nullable|integer|min:3|max:30'
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $relationship = $this->model_relationship($request->relationship, $user, '_tasks', 'tasks');
        $tasks = $user->{$relationship}()->with(['workspace:id,title,avatar_pic', 'parent'])->withCount('users', 'children');
        return $request->limit
                ? $this->decide_ordered($request, $tasks)->search($request->q, null, true)->limit((int) $request->limit)->get()
                : $this->decide_ordered($request, $tasks)->search($request->q, null, true)->paginate(10);
    }
    public function show(Request $request, $workspace, $task)
    {
        $task = Task::where('workspace_id', $workspace)->with([
            'users',
        ])->findOrFail($task);
        $this->authorize('view', $task);
        $relationship = $task->parent_id ? 'parent.users' : 'children.users';
        $task->load([
            'demands' => function($q) { $q->with('from', 'to'); },
            $relationship
        ]);
        return $task;
    }
    public function store(Request $request, $workspace)
    {
        $request->validate([
            'parent' => 'nullable|numeric',
            'title' => 'required|string',
            'group' => 'nullable|string|min:3|max:100',
            'priority' => 'required|numeric',
            'due_to' => 'nullable|numeric',
        ]);
        $this->authorize('create', Task::class);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $workspace = $user->workspaces()->findOrFail($workspace);
        try {
            \DB::beginTransaction();
                $task = new Task();
                $task->title = $request->title;
                $task->description = $request->description;
                $task->parent = $request->parent;
                $task->group = $request->group ?: $this->default_group;
                $task->priority_id = $request->priority;
                $due_to = $request->due_to ? (new \Carbon\Carbon(((int) $request->due_to)))->timezone('Asia/Tehran')->seconds(0) : now();
                $task->due_to = $due_to;
                $task->creator_id = $request->user()->id;
                $task = $workspace->tasks()->create($task->toArray());
                $users = $request->input('users') ?: [];
                $task->users()->attach(
                    array_merge($users, [(string) $request->user()->id])
                );
            \DB::commit();
            return $task;
        } catch(\Exception $e) {
            \DB::rollback();
            throw $e;
        }   
    }
    public function update(Request $request, $workspace, $task)
    {
        $request->validate([
            'parent_id' => 'nullable|numeric',
            'title' => 'required|string',
            'group' => 'nullable|string|min:3|max:100',
            'priority' => 'required|numeric',
            'due_to' => 'nullable|numeric',
        ]);
        $task = Task::where('workspace_id', $workspace)->findOrFail($task);
        $this->authorize('update', $task);
        try {
            \DB::beginTransaction();
                $task->title = $request->title;
                $task->description = $request->description;
                $task->parent_id = $request->parent_id;
                $task->group = $request->group ?: $this->default_group;
                $task->priority_id = $request->priority;
                $due_to = $request->due_to ? (new \Carbon\Carbon(((int) $request->due_to)))->timezone('Asia/Tehran')->seconds(0) : now();
                $task->due_to = $due_to;
                if ($request->finished) {
                    $task->finished_at = $task->finished_at ? null : now();
                    $task->finisher_id = $request->user()->id;
                }
                $task->save();
                $users = $request->input('users') ?: [];
                $task->users()->sync(
                    array_merge($users, [(string) $request->user()->id])
                );
            \DB::commit();
            return $task->load('users');
        } catch(\Exception $e) {
            \DB::rollback();
            throw $e;
        }
    }
    public function destroy(Request $request, $workspace, $task)
    {
        $task = Task::where('workspace_id', $workspace)->findOrFail($task);
        $this->authorize('delete', $task);
        $task->delete();
        return ['okay' => true];
    }

    public function toggle(Request $request, $task)
    {
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $task = $user->tasks()->findOrFail($task);
        $task->finished_at = $task->finished_at ? null : now();
        $task->finisher_id = $user->id;
        if ($task->save()) {
            return $task;
        }
    }
}