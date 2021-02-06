<?php

namespace App\Http\Controllers\Api;

use App\Demand;
use App\DemandMessage;
use App\User;
use App\Workspace;
use Illuminate\Http\Request;

class DemandController extends BaseController
{
    public function index(Request $request, $workspace)
    {
        $model = $request->user();
        if ($request->view_as_admin == 'true') {
            $workspace = Workspace::findOrFail($workspace);
            $this->authorize('update', $workspace);
            $model = ($request->user_id) ? \App\User::find($request->user_id) : $workspace;
        }
        $relationship = $this->model_relationship($request->relationship, $model, '_demands', 'demands');
        $with = $relationship == 'demands' ? 'to' : 'from';
        $user_demands = $model->{$relationship}()->where('workspace_id', $workspace);
        switch ($request->filter) {
            case 'finished':
                $user_demands = $user_demands->whereNotNull('finished_at');
                break;
            case 'unfinished':
                $user_demands = $user_demands->whereNull('finished_at');
                break;
        }
        $user_demands = $this->decide_ordered($request, $user_demands)
                            ->withCount('messages')
                            ->with($with, 'task', 'priority:id,title');
        return $request->limit ? $user_demands->limit((int) $request->limit)->get() : $user_demands->paginate(10);
    }
    public function mixed(Request $request)
    {
        if ($request->view_as_admin == 'true') {
            $model = app(Task::class);
            $this->authorize('viewAny', Task::class);
            if ($request->user_id) {
                $user = \App\User::find($request->user_id);
                $this->authorize('viewAny', User::class);
                $model = $user;
            }
        } else {
            $model = $request->user();
            if ($request->user_id) {
                $target_user = User::findOrFail($request->user_id);
                $this->authorize('view', $target_user);
                $model = $target_user;
            }
        }
        $relationship = $this->model_relationship($request->relationship, $model, '_demands', 'demands');
        $with = $relationship == 'demands' ? 'to' : 'from';
        $user_demands = $model->{$relationship}();
        switch ($request->filter) {
            case 'finished':
                $user_demands = $user_demands->whereNotNull('finished_at');
                break;
            case 'unfinished':
                $user_demands = $user_demands->whereNull('finished_at');
                break;
        }
        $user_demands = $this->decide_ordered($request, $user_demands)
                            ->withCount('messages')
                            ->with($with, 'task', 'priority:id,title', 'workspace');                  
        return $request->limit ? $user_demands->limit((int) $request->limit)->get() : $user_demands->paginate(10);
    }
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|min:3|max:60',
            'order_by' => 'nullable|string',
            'limit' => 'nullable|integer|min:3|max:30'
        ]);
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        $relationship = $this->model_relationship($request->relationship, $user, '_demands', 'demands');
        $with = $relationship == 'demands' ? 'to' : 'from';
        $user_demands = $user->{$relationship}();
        $user_demands = $this->decide_ordered($request, $user_demands)
                        ->withCount('messages')
                        ->with($with, 'task', 'priority:id,title', 'workspace')
                        ->search($request->q, null, true);
        switch ($request->filter) {
            case 'finished':
                $user_demands = $user_demands->whereNotNull('finished_at');
                break;
            case 'unfinished':
                $user_demands = $user_demands->whereNull('finished_at');
                break;
        }
        return $request->limit
                ? $user_demands->limit((int) $request->limit)->get()
                : $user_demands->paginate(10);
    }
    public function store(Request $request, Workspace $workspace)
    {
        $user = $request->user();
        $this->authorize('create', Demand::class);
        $request->validate([
            'title' => 'required|string|min:3|max:255',
            'target_user'  => 'required|numeric',
            'priority' => 'required|numeric',
            'task'     => 'nullable|numeric',
            'due_to'   => 'nullable|numeric',
        ]);
        try {
            \DB::beginTransaction();
            $target_user = \App\User::findOrFail($request->target_user);
            $demand = new Demand();
            $task = null;
            if ($request->task) {
                $task = $user->tasks()->findOrFail($request->task);
                $demand->task_id = $task->id;
            }
            $demand->title = $request->title;
            $demand->priority_id = $request->priority;
            $demand->title = $request->title;
            $demand->to_id = $target_user->id;
            $demand->workspace_id = $workspace->id;
            if (($demand = $user->demands()->save($demand)) && $request->text) {
                $message = new DemandMessage();
                $message->text = $request->text;
                $message->user_id = $user->id;
                $demand->messages()->create($message->toArray());
            }
            \DB::commit();
            $demand['task'] = $task ? $task->toArray() : null;
            return $demand;
        } catch (\Exception $e){
            \DB::rollback();
            return [
                'message' => $e->getMessage()
            ];
        }
    }
    public function show(Workspace $workspace, $demand)
    {
        $demand = $workspace->demands()->with('from', 'to')->findOrFail($demand);
        $this->authorize('view', $demand);
        return $demand;
    }
    public function update(Request $request, Workspace $workspace, $demand)
    {
        $demand = $workspace->demands()->findOrFail($demand);
        $this->authorize('update', $demand);
        $request->validate([
            'title' => 'required|string|min:3|max:255',
            // 'target_user'  => 'required|numeric',
            'priority' => 'required|numeric',
            // 'task'     => 'nullable|numeric',
            // 'due_to'   => 'nullable|numeric',
        ]);
        try {
            \DB::beginTransaction();
            $demand->title = $request->title;
            $demand->priority_id = $request->priority;
            $demand->save();
            \DB::commit();
            return $demand->load('priority');
        } catch (\Exception $e){
            \DB::rollback();
            return [
                'message' => $e->getMessage()
            ];
        }
    }
    public function destroy(Workspace $workspace, $demand)
    {
        $demand = $workspace->demands()->findOrFail($demand);
        $this->authorize('delete', $demand);
        if ($demand->delete()) {
            return ['okay' => true];
        }
        return ['message' => 'خطا در عملیات حذف.'];
    }
    public function toggle(Demand $demand)
    {
        $this->authorize('toggle_state', $demand);
        $demand->finished_at = $demand->finished_at ? null : now();
        $demand->save();
        return ['okay' => true, 'value' => $demand->finished_at];
    }
    public function new_message(Request $request, Demand $demand)
    {
        $this->authorize('view', $demand);
        $request->validate([
            'text' => 'required|string'
        ]);
        $message = new DemandMessage();
        $message->text = $request->text;
        $message->user_id = $request->user()->id;
        $message = $demand->messages()->save($message);
        $message['user'] = $request->user();
        return $message;
    }
    public function messages(Demand $demand)
    {
        $this->authorize('view', $demand);
        return $demand->messages()->with('user')->orderBy('created_at', 'desc')->paginate(10);
    }
}