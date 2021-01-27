<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    public function index(Request $request)
    {
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        return $user->workspaces()->with('users')->withCount(['tasks', 'finished_tasks', 'demands_left'])->get();
    }
    public function show(Request $request, Workspace $workspace)
    {
        $this->authorize('view', $workspace);
        return $workspace->load('users');
    }
    public function groups(Request $request, $workspace)
    {
        $groups = $request->user()->tasks()->whereWorkspaceId($workspace)
        ->select('group as name', \DB::raw('count(*) as tasks'))
        ->groupBy('group')->get();
        return $groups;
    }
}