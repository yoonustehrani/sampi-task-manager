<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Task;
use App\Workspace;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request, $workspace)
    {
        $request->validate([
            'limit' => 'nullable|numeric',
            'order' => 'nullable|string',
            'order_by' => 'nullable|string'
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $relationship = $request->relationship && method_exists($user, $request->relationship . '_tasks')
                        ? $request->relationship . '_tasks'
                        : 'tasks';
        $user_tasks = $user->{$relationship}()->with('users')->withCount('demands')->where('workspace_id', $workspace);
        if ($request->order_by) {
            $order = $request->order != 'desc' ? 'asc' : 'desc';
            $user_tasks = $user_tasks->orderBy($request->order_by, $order);
        }
        if ($request->limit) {
            return $user_tasks->limit((int) $request->limit)->get();
        } else {
            return $user_tasks->latest()->paginate(10);
        }
    }
    public function mixed(Request $request)
    {
        $request->validate([
            'limit' => 'nullable|numeric',
            'order' => 'nullable|string',
            'order_by' => 'nullable|string'
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $relationship = $request->relationship && method_exists($user, $request->relationship . '_tasks')
                        ? $request->relationship . '_tasks'
                        : 'tasks';
        $user_tasks = $user->{$relationship}()->with([
            'users',
            'workspace:id,title,avatar_pic'
        ])->withCount('demands');
        if ($request->order_by) {
            $order = $request->order != 'desc' ? 'asc' : 'desc';
            $user_tasks = $user_tasks->orderBy($request->order_by, $order);
        }
        if ($request->limit) {
            return $user_tasks->limit((int) $request->limit)->get();
        } else {
            return $user_tasks->paginate(10);
        }
    }
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|min:3|max:60',
            'order_by' => 'nullable|string|min:3',
            'limit' => 'required|integer|min:3|max:30'
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $relationship = $request->relationship && method_exists($user, $request->relationship . '_tasks')
                        ? $request->relationship . '_tasks'
                        : 'tasks';
        $tasks = $user->{$relationship}()->with(['workspace:id,title,avatar_pic'])->withCount('users');
        if ($request->order_by) {
            $order = $request->order && $request->order != 'desc' ? 'asc' : 'desc';
            $tasks = $tasks->orderBy($request->order_by, $order);
        }
        return $tasks->search($request->q, null, true)
                     ->limit((int) $request->limit)
                     ->get();
    }
    public function show(Request $request, $workspace, $task)
    {
        $task = Task::where('workspace_id', $workspace)->with([
            'demands' => function($q) { $q->with('from', 'to'); }
        ])->findOrFail($task);
        $task->load('users');
        return $task;
    }
    public function store(Request $request, $workspace)
    {
        $request->validate([
            'parent_id' => 'nullable|numeric',
            'title' => 'required|string',
            'group' => 'nullable|string|min:3|max:100',
            'priority' => 'required|numeric',
            'due_to' => 'nullable|numeric',
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $workspace = $user->workspaces()->findOrFail($workspace);
        try {
            \DB::beginTransaction();
                $task = new Task();
                $task->title = $request->title;
                $task->description = $request->description;
                $task->parent_id = $request->parent_id;
                $task->group = $request->group ?: 'دسته بندی نشده';
                $task->priority_id = $request->priority;
                $task->due_to = $request->due_to;
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
            'proiority' => 'required|numeric',
            'due_to' => 'nullable|numeric',
        ]);
        $task = Task::where('workspace_id', $workspace)->findOrFail($task);
        try {
            \DB::beginTransaction();
                $task->title = $request->title;
                $task->description = $request->description;
                $task->parent_id = $request->parent_id;
                $task->group = $request->group ?: 'دسته بندی نشده';
                $task->proiority_id = $request->proiority;
                $task->due_to = $request->due_to;
                $task->save();
                $users = $request->input('users') ?: [];
                $task->users()->sync(
                    array_merge($users, [(string) $request->user()->id])
                );
            \DB::commit();
            return $task;
        } catch(\Exception $e) {
            \DB::rollback();
            throw $e;
        }   
    }
    public function destroy(Request $request, $workspace, $task)
    {
        $task = Task::where('workspace_id', $workspace)->findOrFail($task);
        if ($request->user()->id === $task->creator_id) {
            $task->delete();
            return ['okay' => true];
        }
        abort(403);
    }
}