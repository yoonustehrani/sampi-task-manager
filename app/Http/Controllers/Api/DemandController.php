<?php

namespace App\Http\Controllers\Api;

use App\Demand;
use App\DemandMessage;
use App\Events\DemandCreated;
use App\Events\DemandFinished;
use App\Events\DemandMessageCreated;
use App\Events\DemandReminded;
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
            $model = $workspace->demands();
            if ($request->user_id) {
                $model = \App\User::findOrFail($request->user_id);
            }
        }
        $user_demands = $model;
        if ($model instanceof User) {
            $relationship = $this->model_relationship($request->relationship, $model, '_demands', 'demands');
            $with = $relationship == 'demands' ? 'to' : 'from';
            $workspaceId = ($workspace instanceof Workspace) ? $workspace->id : $workspace;
            $user_demands = $model->{$relationship}()->where('workspace_id', $workspaceId)->with($with, 'task', 'priority:id,title');
        } else {
            $user_demands = $model->with('from', 'to', 'task', 'priority:id,title');
        }
        switch ($request->filter) {
            case 'finished':
                $user_demands = $user_demands->whereNotNull('finished_at');
                break;
            case 'unfinished':
                $user_demands = $user_demands->whereNull('finished_at');
                break;
        }
        $user_demands = $this->decide_ordered($request, $user_demands)->withCount('messages');
        return $request->limit ? $user_demands->limit((int) $request->limit)->get() : $user_demands->paginate(10);
    }
    public function mixed(Request $request)
    {
        $with = null;
        if ($request->view_as_admin == 'true') {
            $model = app(Demand::class);
            $this->authorize('viewAny', Demand::class);
            $user_demands = $model;
            if ($request->user_id) {
                $user = \App\User::find($request->user_id);
                $this->authorize('viewAny', User::class);
                $model = $user;
                $relationship = $this->model_relationship($request->relationship, $model, '_demands', 'demands');
                $with = $relationship == 'demands' ? 'to' : 'from';
                $user_demands = $model->{$relationship}();
            }
        } else {
            $model = $request->user();
            if ($request->user_id) {
                $target_user = User::findOrFail($request->user_id);
                $this->authorize('view', $target_user);
                $model = $target_user;
            }
            $relationship = $this->model_relationship($request->relationship, $model, '_demands', 'demands');
            $with = $relationship == 'demands' ? 'to' : 'from';
            $user_demands = $model->{$relationship}();
        }
        switch ($request->filter) {
            case 'finished':
                $user_demands = $user_demands->whereNotNull('finished_at');
                break;
            case 'unfinished':
                $user_demands = $user_demands->whereNull('finished_at');
                break;
        }
        $user_demands = $this->decide_ordered($request, $user_demands)->withCount('messages')->whereHas('workspace'); 
        if ($with) {
            $user_demands = $user_demands->with($with, 'task', 'priority:id,title', 'workspace');
        } else {
            $user_demands = $user_demands->with('from', 'to', 'task', 'priority:id,title', 'workspace');
        }
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
        $user_demands = $user->{$relationship}()->whereHas('workspace');
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
            $demand['from'] = $user;
            $demand['to'] = $target_user;
            event(new DemandCreated($demand));
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
            'priority' => 'required|numeric',
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
        if ($demand->save()) {
            $demand->load('from', 'to');
            event(new DemandFinished($demand));
            return ['okay' => true, 'value' => $demand->finished_at];
        };
        response()->json([
            'okay' => false, 'errors' => [
                'whole' => 'ذخیره نشد',
            ]
        ], 422);
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
        $demand->load('from', 'to');
        event(new DemandMessageCreated($demand, $message));
        return $message;
    }
    public function messages(Request $request, Demand $demand)
    {
        $this->authorize('view', $demand);
        $user = $request->user();
        if (! $request->page || $request->page == '1' || $request->page == 1) {
            $demand->read_unread_messages($user->id);
        }
        return $demand->messages()->with('user')->orderBy('created_at', 'desc')->paginate(10);
        return response()->json([
            'okay' => false
        ], 500);
    }
    public function remind(Request $request, Demand $demand)
    {
        $this->authorize('view', $demand);
        $side = $request->side == 'to' ? 'to' : 'from';
        $demand->load('from', 'to');
        event(new DemandReminded($demand, $side, $request->user()));
        return ['okay' => true];
    }
}