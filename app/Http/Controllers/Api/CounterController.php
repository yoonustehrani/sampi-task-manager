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
                'count' => $user->finished_tasks()->whereHas('workspace')->count(),
                'href'  => route('task-manager.tasks.index', ['relationship' => 'finished'])
            ],
            'unfinished' => [
                'count' => $user->unfinished_tasks()->whereHas('workspace')->count(),
                'href'  => route('task-manager.tasks.index', ['relationship' => 'unfinished'])
            ],
            'expired' => [
                'count' => $user->expired_tasks()->whereHas('workspace')->count(),
                'href'  => route('task-manager.tasks.index', ['relationship' => 'expired'])
            ]
        ];
    }
    public function demands(Request $request)
    {
        $user = ($request->user_id) ? \App\User::find($request->user_id) : $request->user();
        return [
            'asked_demands' => [
                'unfinished' => [
                    'count' => $user->asked_demands()->whereNull('finished_at')->whereHas('workspace')->count(),
                    'href'  => route('task-manager.demands.mixed', ['tab' => 'asked_demands'])
                ]
            ],
            'demands' => [
                'unfinished' => [
                    'count' => $user->demands()->whereNull('finished_at')->whereHas('workspace')->count(),
                    'href'  => route('task-manager.demands.mixed', ['tab' => 'demand'])
                ]
            ],
        ];
    }
}