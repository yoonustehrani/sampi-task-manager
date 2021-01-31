<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'task-manager', 'as' => 'api.task-manager.'], function () {
    Route::get('priorities', function() {
        return \App\Priority::all();
    })->name('priorities.index');
    Route::get('permissions/all', function () {
        return \App\Permission::all();
    })->name('permissions.index');
    Route::get('roles/all', function () {
        return \App\Role::all();
    })->name('roles.index');
    Route::get('users/{user}/roles', function ($user) {
        return \App\User::findOrFail($user)->roles()->get();
    })->name('user.roles');
    Route::get('roles/{role}/permissions', function ($role) {
        return \App\Role::findOrFail($role)->permissions()->get();
    })->name('role.permissions');
    Route::group(['middleware' => ['auth:api']], function () {
        $api_controllers = '\\App\\Http\\Controllers\\Api\\';
        Route::apiResource('workspaces', $api_controllers . 'WorkspaceController');
        Route::get('workspaces/{workspace}/task_groups', $api_controllers . 'WorkspaceController@groups')->name('workspaces.groups');
        Route::apiResource('workspaces/{workspace}/tasks', $api_controllers . 'TaskController');
        Route::apiResource('workspaces/{workspace}/demands', $api_controllers . 'DemandController');
        Route::get('tasks', $api_controllers . 'TaskController@mixed')->name('tasks.mixed');
        Route::get('demands', $api_controllers . 'DemandController@mixed')->name('demands.mixed');
        Route::get('demands/{demand}/messages', $api_controllers . 'DemandController@messages')->name('demands.messages.index');
        Route::post('demands/{demand}/messages', $api_controllers . 'DemandController@new_message')->name('demands.messages.store');
        Route::get('tasks/search', $api_controllers . 'TaskController@search')->name('tasks.search');
        Route::get('tasks/search/simple', $api_controllers . 'TaskController@simple_search')->name('tasks.search.simple');
        Route::get('demands/search', $api_controllers . 'DemandController@search')->name('demands.search');
        Route::put('tasks/{task}/toggle_state', $api_controllers . 'TaskController@toggle')->name('tasks.toggle_state');
        Route::put('demands/{demand}/toggle_state', $api_controllers . 'DemandController@toggle')->name('demands.toggle_state');
        Route::group(['prefix' => 'count', 'as' => 'counter.'], function() use($api_controllers) {
            Route::get('workspaces', $api_controllers . 'CounterController@workspaces')->name('workspaces');
            Route::get('tasks', $api_controllers . 'CounterController@tasks')->name('tasks');
            Route::get('demands', $api_controllers . 'CounterController@demands')->name('demands');
        });
    });
});

