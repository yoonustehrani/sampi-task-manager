<?php

namespace App\Http\Controllers;

use App\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public $route_prefix = parent::TASKROUTE . "permissions";
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permissions = Permission::withCount(['roles'])->paginate(15);
        return view('theme.pages.permissions.index', compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('theme.pages.permissions.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $permission = new Permission();
        $permission->key = $request->key;
        $permission->label = $request->label;
        $permission->save();
        return redirect()->to(route("{$this->route_prefix}.index"));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $permission
     * @return \Illuminate\Http\Response
     */
    public function show($permission)
    {
        $permission = Permission::with('roles.users')->findOrFail($permission);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $permission
     * @return \Illuminate\Http\Response
     */
    public function edit($permission)
    {
        $permission = Permission::findOrFail($permission);
        return view('theme.pages.permissions.edit', compact('permission'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $permission)
    {
        $permission = Permission::findOrFail($permission);
        $permission->key = $request->key; // unique
        $permission->label = $request->label;
        $permission->save();
        return redirect()->to(route("{$this->route_prefix}.edit", ['permission' => $permission->id]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy($permission)
    {
        Permission::findOrFail($permission)->delete();
        return back();
    }
}
