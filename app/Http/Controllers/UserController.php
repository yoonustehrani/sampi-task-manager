<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with(['roles'])->paginate(15);
        return view('theme.pages.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('theme.pages.users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->telegram_chat_id = $request->telegram_chat_id;
        $user->avatar_pic = $request->avatar_pic;
        $user->password = bcrypt($request->password);
        $user->roles()->sync($request->input('roles'));
        $user->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $user
     * @return \Illuminate\Http\Response
     */
    public function show($user)
    {
        $user = User::with('roles')->findOrFail($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $user
     * @return \Illuminate\Http\Response
     */
    public function edit($user)
    {
        $user = User::findOrFail($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user)
    {
        $user = User::findOrFail($user);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->telegram_chat_id = $request->telegram_chat_id;
        $user->avatar_pic = $request->avatar_pic;
        $user->password = bcrypt($request->password);
        $user->roles()->sync($request->input('roles'));
        $user->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $user)
    {
        if ($request->get('force_delete')) {
            // check if user can force delete
        }
        User::findOrFail($user)->delete();
    }
}
