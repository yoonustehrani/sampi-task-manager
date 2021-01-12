<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->workspaces()->with('users')->withCount(['tasks', 'finished_tasks', 'demands_left'])->get();
    }
}