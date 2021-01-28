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
                'href'  => route('task-manager.tasks.index')
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
            'asked_demands' => [
                'unfinished' => [
                    'count' => $user->asked_demands()->whereNull('finished_at')->count(),
                    'href'  => route('task-manager.demands.mixed', ['tab' => 'asked_demands'])
                ]
            ],
            'demands' => [
                'unfinished' => [
                    'count' => $user->demands()->whereNull('finished_at')->count(),
                    'href'  => route('task-manager.demands.mixed', ['tab' => 'demand'])
                ]
            ],
        ];
    }
}