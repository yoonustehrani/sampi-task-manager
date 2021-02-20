<?php

namespace App\Http\Controllers\Api;

use App\Events\TaskCreated;
use App\Events\TaskFinished;
use App\Task;
use App\User;
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
        $model = $request->user();
        if ($request->view_as_admin == 'true') {
            $workspace = Workspace::findOrFail($workspace);
            $this->authorize('update', $workspace);
            $model = $workspace;
            if ($request->user_id) {
                $target_user = \App\User::find($request->user_id);
                $model = $target_user;
            }
        }
        $relationship = $this->model_relationship($request->relationship, $model, '_tasks', 'tasks');
        if ($model instanceof User) {
            $workspaceId = ($workspace instanceof Workspace) ? $workspace->id : $workspace;
            $user_tasks = $model->{$relationship}()->where('workspace_id', $workspaceId);
        } else {
            $user_tasks = $model->{$relationship}();
        }
        $user_tasks = $user_tasks->whereNull('parent_id')->with('users')->withCount('demands', 'children');
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
        
        if ($request->view_as_admin == 'true') {
            $model = app(Task::class);
            $this->authorize('viewAny', Task::class);
            if ($request->user_id) {
                $user = \App\User::find($request->user_id);
                $this->authorize('viewAny', User::class);
                $model = $user;
                $relationship = $this->model_relationship($request->relationship, $model, '_tasks', 'tasks');
                $model = $model->{$relationship}();
            }
        } else {
            $model = $request->user();
            $relationship = $this->model_relationship($request->relationship, $model, '_tasks', 'tasks');
            if ($request->user_id) {
                $target_user = User::findOrFail($request->user_id);
                $this->authorize('view', $target_user);
                $model = $target_user;
            }
            $model = $model->{$relationship}();
        }
        
        $model = $model->whereNull('parent_id')->whereHas('workspace')->with(['users','workspace:id,title,avatar_pic'])->withCount('demands', 'children');
        return $request->limit
            ? $this->decide_ordered($request, $model)->limit((int) $request->limit)->get()
            : $this->decide_ordered($request, $model)->paginate(10);
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
        $tasks = $tasks = $user->{$relationship}()->whereHas('workspace')->with(['workspace:id,title,avatar_pic', 'parent', 'users'])->withCount('children');
        return $request->limit
                ? $this->decide_ordered($request, $tasks)->search($request->q, null, true)->limit((int) $request->limit)->get()
                : $this->decide_ordered($request, $tasks)->search($request->q, null, true)->paginate(10);
    }
    public function simple_search(Request $request)
    {
        $request->validate([
            'q' => 'required|min:3|max:60',
            'workspace' => 'nullable|numeric|min:1'
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $relationship = $this->model_relationship($request->relationship, $user, '_tasks', 'tasks');
        $tasks = $user->{$relationship}()->select('id','title','group', 'workspace_id')->search($request->q, null, true);
        if ($request->workspace) {
            $tasks = $tasks->where('workspace_id', $request->workspace);
        } else {
            $tasks = $tasks->whereHas('workspace')->with('workspace:id,title,avatar_pic');
        }
        if ($request->parent_only) {
            $tasks = $tasks->whereNull('parent_id');
        }
        return $tasks->limit(5)->get();
    }
    public function show(Request $request, $workspace, $task)
    {
        $task = Task::where('workspace_id', $workspace)->with([
            'users',
        ])->findOrFail($task);
        $this->authorize('view', $task);
        $relationship = $task->parent_id ? 'parent' : 'children';
        $task->load([
            'demands',
            $relationship,
            'finisher'
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
        ]);
        $this->authorize('create', Task::class);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $workspace = $user->workspaces()->findOrFail($workspace);
        try {
            \DB::beginTransaction();
                $task = new Task;
                $task->title = $request->title;
                $task->description = $request->description;
                $task->parent_id = $request->parent_id;
                $task->group = $request->group ?: $this->default_group;
                $task->priority_id = $request->priority;
                $task->due_to = $request->due_to ?: null;
                $task->creator_id = $request->user()->id;
                $task = $workspace->tasks()->save($task);
                $users = $request->input('users') ?: [];
                $task->users()->attach(
                    array_merge($users, [(string) $request->user()->id])
                );
            \DB::commit();
            $task['workspace'] = $workspace;
            // event(new TaskCreated($task));
            return $task->parent_id ? $task->load(['parent', 'users']) : $task->load('users');
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
                $task->due_to = $request->due_to ?: null;
                $finisher = $task->finisher_id ?: $request->user()->id;
                $finished_at = $task->finished_at ?: now();
                $task->finisher_id = $request->finished ? $finisher : null;
                $task->finished_at = $request->finished ? $finished_at : null;
                if ($task->save()) {
                    if ($task->finished_at) {
                        $task->load('workspace', 'finisher');
                        event(new TaskFinished($task));
                    }
                };
                $users = $request->input('users') ?: [];
                $task->users()->sync(
                    array_merge($users, [(string) $request->user()->id])
                );
            \DB::commit();
            return $task->parent_id ? $task->load(['parent', 'users']) : $task->load('users');
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
        $task->finisher_id = $task->finished_at ? null : $user->id;
        $task->finished_at = $task->finished_at ? null : now();
        if ($task->save()) {
            if ($task->finished_at) {
                $task->load('workspace', 'finisher');
                event(new TaskFinished($task));
            }
            return $task;
        }
    }
}