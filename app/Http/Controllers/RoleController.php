<?php

namespace App\Http\Controllers;

use App\Permission;
use App\Role;
use App\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Role::class);
        $roles = Role::withCount(['permissions', 'users'])->get();
        return view('theme.pages.roles.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Role::class);
        return view('theme.pages.roles.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Role::class);
        try {
            \DB::beginTransaction();
            $role = new Role();
            $role->name = $request->name;
            $role->label = $request->label;
            $role->save();
            $permissions = (in_array('0', $request->input('permissions'))) ? Permission::all() : $request->input('permissions');
            $role->permissions()->attach($permissions);
            \DB::commit();
            return redirect()->to(route('task-manager.roles.index'));
        } catch(\Exception $e) {
            \DB::rollBack();
            return back();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($role)
    {
        $this->authorize('view', Role::class);
        $role = Role::with(['permissions', 'users'])->findOrFail($role);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $role
     * @return \Illuminate\Http\Response
     */
    public function edit($role)
    {
        $role = Role::findOrFail($role);
        $this->authorize('update', $role);
        return view('theme.pages.roles.edit', compact('role'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $role)
    {
        $role = Role::findOrFail($role);
        $this->authorize('update', $role);
        try {
            \DB::beginTransaction();
            $role->name = $request->name;
            $role->label = $request->label;
            $role->save();
            $selected = $request->input('permissions') ?: [];
            $permissions = (in_array('0', $selected)) ? Permission::all() : $selected;
            $role->permissions()->sync($permissions);
            \DB::commit();
            return redirect()->to(route('task-manager.roles.edit', ['role' => $role->id]));
        } catch(\Exception $e) {
            \DB::rollBack();
            return back();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $this->authorize('delete', $role);
        $role->delete();
        return back();
    }
}
