<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // public function before($user, $ability)
    // {
    //     // if ($user->isSuperAdmin()) {
    //     //     return true;
    //     // }
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $this->authorize('viewAny', auth()->user());
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
        $this->authorize('create', auth()->user());
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
        $this->authorize('create', auth()->user());
        try {
            \DB::beginTransaction();
            $user = new User();
            $user->name = $request->name;
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->telegram_chat_id = $request->telegram_chat_id;
            $user->avatar_pic = $request->avatar_pic;
            $user->password = bcrypt($request->password);
            $user->api_token = \Illuminate\Support\Str::uuid();
            $user->save();
            $user->roles()->sync($request->input('roles'));
            \DB::commit();
            return redirect()->to(route('task-manager.users.index'));
        } catch(\Exception $e) {
            \DB::rollBack();
            return back();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $user
     * @return \Illuminate\Http\Response
     */
    public function show($user)
    {
        $user = User::with(['roles', 'workspaces' => function($q) { $q->withCount('users'); }])->findOrFail($user);
        return view('theme.pages.users.show', compact('user'));
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
        return view('theme.pages.users.edit', compact('user'));
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
        try {
            \DB::beginTransaction();
            $user->name = $request->name;
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->telegram_chat_id = $request->telegram_chat_id;
            $user->avatar_pic = $request->avatar_pic;
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            $user->save();
            $selected = $request->input('roles') ?: [];
            $roles = (in_array('0', $selected)) ? Role::all() : $selected;
            $user->roles()->sync($roles);
            \DB::commit();
            return redirect()->to(route('task-manager.users.index'));
        } catch(\Exception $e) {
            \DB::rollBack();
            return back();
        }
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
