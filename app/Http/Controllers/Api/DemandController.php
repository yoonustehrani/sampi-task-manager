<?php

namespace App\Http\Controllers\Api;

use App\Demand;
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
                ->with('from', 'to', 'proiority', 'task') 
                ->paginate(10);
    }
    public function mixed(Request $request)
    {
        $user = $request->user();
        $relationship = $this->model_relationship($request->relationship, $user, '_demands', 'demands');
        return  $user->{$relationship}()
                ->with('from', 'to', 'proiority', 'task', 'workspace')
                ->paginate(10);
    }
    public function show(Workspace $workspace, $demand)
    {
        return $workspace->demands()->with(['from', 'to', 'priority', 'task'])->findOrFail($demand);
    }
}