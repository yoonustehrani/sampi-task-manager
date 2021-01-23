<?php

use App\User;
use Carbon\Carbon;
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
    // $user = auth()->user() ?: User::find(2);
    // return $user->actions()->with('subject')->limit(5)->get();
    // return "<a href='". route('task-manager.') ."'>Task Manager</a>";
    // return view('index');
});

Route::get('/chart', function() {
    // $user = User::first();
    // $dt_from = Carbon::createFromFormat('Y-m-d', '2021-01-01')->setTime(0,0);
    // $dt_to = Carbon::createFromFormat('Y-m-d', '2021-01-30')->setTime(0,0);
    // if (! $dt_from->isBefore($dt_to)) {
    //     return [
    //         'error' => true
    //     ];
    // }
    // $tasks = $user->tasks()
    //             ->where('created_at', '<', $dt_to)
    //             ->where('created_at', '>=', $dt_from)
    //             ->groupBy('date')
    //             ->orderBy('date', 'asc')
    //             ->get([
    //                 \DB::raw("COUNT(*) tasks, DATE_FORMAT(created_at, '%Y-%m-%e') date")
    //             ]);
    // return $tasks;
    return view('chart');
});

Route::group(['prefix' => 'task-manager', 'as' => 'task-manager.', 'middleware' => ['auth']], function () {
    Route::get('/', function() {
        return view('theme.dashboard');
    });
    Route::resource('users', 'UserController');
    Route::resource('roles', 'RoleController');
    Route::resource('permissions', 'PermissionController');
    Route::resource('priorities', 'PriorityController');
    Route::resource('workspaces',  'WorkspaceController');
    Route::resource('demands',     'DemandController');
    Route::resource('tasks',       'TaskController');
    // Route::get('workspaces/{workspace}/tasks/{}', 'TaskController@index');
});

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');
