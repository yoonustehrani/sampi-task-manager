<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CounterController extends Controller
{
    public function workspaces(Request $request)
    {
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        return [
            'all' => [
                'count' => $user->workspaces()->count(),
                'href'  => route('task-manager.workspaces.index')
            ]
        ];
    }
    public function tasks(Request $request)
    {
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        return [
            'finished' => [
                'count' => $user->finished_tasks()->count(),
                'href'  => '#'
            ],
            'unfinished' => [
                'count' => $user->unfinished_tasks()->count(),
                'href'  => '#'
            ],
            'expired' => [
                'count' => $user->expired_tasks()->count(),
                'href'  => '#'
            ]
        ];
    }
    public function demands(Request $request)
    {
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        return [
            'finished'   => [
                'count' => $user->demands()->whereNull('finished_at')->count(),
                'href'  => '#'
            ],
            'unfinished' => [
                'count' => $user->demands()->whereNotNull('finished_at')->count(),
                'href'  => '#'
            ],
        ];
    }
}