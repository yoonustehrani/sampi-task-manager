<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    public function index(Request $request)
    {
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        return $user->workspaces()->with('users')->withCount(['tasks', 'finished_tasks', 'demands_left'])->get();
    }
}