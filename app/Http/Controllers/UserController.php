<?php

namespace App\Http\Controllers;

use App\Role;
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
        $this->authorize('viewAny', auth()->user());
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
        $request->validate([
            'name' => 'required|string|min:3|max:60|unique:users,name',
            'email' => 'required|email|min:3|max:60|unique:users,email',
            'first_name' => 'required|string|min:3|max:60',
            'last_name' => 'nullable|string|min:3|max:60',
            'telegram_chat_id' => 'nullable|numeric',
            'avatar_pic' => 'nullable|string',
            'password' => 'required|string|min:8|confirmed',
        ]);
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
        $this->authorize('update', $user);
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
        $this->authorize('update', $user);
        $request->validate([
            'name' => 'required|string|min:3|max:60|unique:users,name,' . $user->id,
            'email' => 'required|email|min:3|max:60|unique:users,email,' . $user->id,
            'first_name' => 'required|string|min:3|max:60',
            'last_name' => 'nullable|string|min:3|max:60',
            'telegram_chat_id' => 'nullable|numeric',
            'avatar_pic' => 'nullable|string',
            'password' => 'nullable|string|min:8|confirmed',
        ]);
        try {
            \DB::beginTransaction();
            $user->name = $request->name;
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            if ($request->password) {
                $user->password = bcrypt('password');
            }
            $user->telegram_chat_id = $request->telegram_chat_id;
            if ($request->avatar_pic) {
                $user->avatar_pic = $request->avatar_pic;
            }
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            $user->save();
            if (auth()->user()->hasPermission('can_edit_user_role')) {
                $selected = $request->input('roles') ?: [];
                $roles = (in_array('0', $selected)) ? Role::all() : $selected;
                $user->roles()->sync($roles);
            }
            \DB::commit();
            return redirect()->to(route('task-manager.users.edit', ['user' => $user->id]));
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
        $user = User::findOrFail($user);
        if ($request->get('force_delete')) {
            $this->authorize('forceDelete', $user);
        } else {
            $this->authorize('delete', $user);
        }
        $user->delete();
    }
}
