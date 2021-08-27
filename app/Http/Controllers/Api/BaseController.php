<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function model_relationship($requested, $model, $suffix, $default)
    {
        return $requested && method_exists($model, $requested . $suffix) ? $requested . $suffix : $default;
    }
    public function decide_ordered(Request $request, $model)
    {
        if ($request->order_by) {
            $order = $request->order != 'desc' ? 'asc' : 'desc';
            return $model->orderBy($request->order_by, $order);
        }
        return $model;
    }
    public function role_permissions($role)
    {
        return \App\Role::findOrFail($role)->permissions()->get();
    }
    public function roles()
    {
        return \App\Role::all();
    }
    public function permissions()
    {
        return \App\Permission::all();
    }
    public function priorities()
    {
        return \App\Priority::all();
    }
}