<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', User::class);
        return User::all();
    }
    public function show($user)
    {
        $user = User::with('roles')->findOrFail($user);
        $this->authorize('view', $user);
        return $user;
    }
    public function roles($user)
    {
        return \App\User::findOrFail($user)->roles()->get();
    }
}