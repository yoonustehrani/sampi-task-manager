<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CounterController extends Controller
{
    public function workspaces(Request $request)
    {
        return [
            'all' => [
                'count' => $request->user()->workspaces()->count(),
                'href'  => route('task-manager.workspaces.index')
            ]
        ];
    }
    public function tasks(Request $request)
    {
        $user = $request->user();
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
                'count' => $user->tasks()->whereNotNull('due_to')->where('due_to', '<', now('Asia/Tehran'))->count(),
                'href'  => '#'
            ]
        ];
    }
    public function demands(Request $request)
    {
        $user = $request->user();
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