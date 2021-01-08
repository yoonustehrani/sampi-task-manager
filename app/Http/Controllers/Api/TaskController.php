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
        return $request->user()->tasks()->with('users')->withCount('demands')->where('workspace_id', $workspace)->latest()->paginate(10);
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
        $workspace = $request->user()->workspaces()->findOrFail($workspace);
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