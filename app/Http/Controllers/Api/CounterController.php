<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CounterController extends Controller
{
    public function workspaces(Request $request)
    {
        return ['count' => $request->user()->workspaces()->count()];
    }
    public function tasks(Request $request)
    {
        $count = 0;
        $user = $request->user();
        if ($request->relationship && method_exists($user, $request->relationship . '_tasks')) {
            $count = $user->{$request->relationship . '_tasks'}()->count();
        } else {
            $count = $user->tasks()->count();
        }
        return ['count' => $count];
    }
    public function demands(Request $request)
    {
        $count = 0;
        $user = $request->user();
        if ($request->relationship && method_exists($user, $request->relationship . '_demnds')) {
            $count = $user->{$request->relationship . '_demnds'}()->count();
        } else {
            $count = $user->demands()->count();
        }
        return ['count' => $count];
    }
}