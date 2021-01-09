<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CounterController extends Controller
{
    public function workspaces(Request $request)
    {
        return ['all' => $request->user()->workspaces()->count()];
    }
    public function tasks(Request $request)
    {
        $user = $request->user();
        return [
            'finished'   => $user->finished_tasks()->count(),
            'unfinished' => $user->unfinished_tasks()->count(),
            'expired'    => $user->tasks()->whereNotNull('due_to')->where('due_to', '<', now('Asia/Tehran'))->count()
        ];
    }
    public function demands(Request $request)
    {
        $user = $request->user();
        return [
            'finished'   => $user->demands()->whereNull('finished_at')->count(),
            'unfinished' => $user->demands()->whereNotNull('finished_at')->count(),
        ];
    }
}