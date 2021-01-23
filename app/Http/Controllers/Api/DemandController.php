<?php

namespace App\Http\Controllers\Api;

use App\Demand;
use App\DemandMessage;
use App\Workspace;
use Illuminate\Http\Request;

class DemandController extends BaseController
{
    public function index(Request $request, $workspace)
    {
        $user = $request->user();
        $relationship = $this->model_relationship($request->relationship, $user, '_demands', 'demands');
        return  $user->{$relationship}()
                ->where('workspace_id', $workspace)
                ->withCount('messages')
                ->with('from', 'to', 'priority:id,title')
                ->paginate(10);
    }
    public function mixed(Request $request)
    {
        $user = $request->user();
        $relationship = $this->model_relationship($request->relationship, $user, '_demands', 'demands');
        return  $user->{$relationship}()
                ->with('from', 'to', 'priority:id,title', 'workspace')
                ->paginate(10);
    }
    public function show(Workspace $workspace, $demand)
    {
        $demand = $workspace->demands()->with(['from', 'to', 'priority:id,title', 'task'])->findOrFail($demand);
        $demand->load(['messages' => function($q) {
            $q->orderBy('created_at', 'asc');
        }]);
        return $demand;
    }
    public function store(Request $request, Workspace $workspace)
    {
        $request->validate([
            'title' => 'required|string|min:3|max:255',
            'target_user'  => 'required|numeric',
            'priority' => 'required|numeric',
            'task'     => 'nullable|numeric',
            'due_to'   => 'nullable|numeric',
        ]);
        try {
            \DB::beginTransaction();
            $user = $request->user();
            $target_user = \App\User::findOrFail($request->target_user);
            $demand = new Demand();
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
            return $demand;
        } catch (\Exception $e){
            \DB::rollback();
            return [
                'message' => $e->getMessage()
            ];
        }
    }
    public function update(Request $request, Workspace $workspace, $demand)
    {
        $request->validate([
            'text' => 'required|string'
        ]);
        $demand = $workspace->demands()->findOrFail($demand);
        $message = new DemandMessage();
        $message->text = $request->text;
        $message->user_id = $request->user()->id;
        $demand->messages()->create($message->toArray());
        return ['okay' => true];
    }
    public function destroy(Workspace $workspace, $demand)
    {
        $demand = $workspace->demands()->findOrFail($demand);
        if ($demand->delete()) {
            return ['okay' => true];
        }
        return ['message' => 'خطا در عملیات حذف.'];
    }
}