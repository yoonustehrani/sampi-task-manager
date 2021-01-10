<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return "<a href='". route('task-manager.') ."'>Task Manager</a>";
    return view('index');
});

Route::view('/chart', 'chart');

Route::group(['prefix' => 'task-manager', 'as' => 'task-manager.', 'middleware' => ['auth']], function () {
    Route::get('/', function() {
        return view('theme.dashboard');
    });
    Route::resource('users', 'UserController');
    Route::resource('roles', 'RoleController');
    Route::resource('permissions', 'PermissionController');
    Route::resource('proiorities', 'ProiorityController');
    Route::resource('workspaces',  'WorkspaceController');
    Route::resource('demands',     'DemandController');
    Route::resource('tasks',       'TaskController');
    // Route::get('workspaces/{workspace}/tasks/{}', 'TaskController@index');
});

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');
