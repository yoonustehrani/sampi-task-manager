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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'task-manager', 'as' => 'api.task-manager.'], function () {
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
    // Route::get('workspaces/{workspace}/tasks', 'TaskManagerController@tasks');
    Route::group(['middleware' => ['auth:api']], function () {
        $api_controllers = '\\App\\Http\\Controllers\\Api\\';
        Route::apiResource('workspaces', $api_controllers . 'WorkspaceController');
        Route::apiResource('workspaces/{workspace}/tasks', $api_controllers . 'TaskController');
        Route::get('tasks', $api_controllers . 'TaskController@mixed')->name('tasks.mixed');
        Route::prefix('count')->group(function() use($api_controllers) {
            Route::get('workspaces', $api_controllers . 'CounterController@workspaces');
            Route::get('tasks', $api_controllers . 'CounterController@tasks');
            Route::get('demands', $api_controllers . 'CounterController@demands');
        });
    });
});

