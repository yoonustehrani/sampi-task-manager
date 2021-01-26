<?php

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
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

// $user = auth()->user() ?: User::find(2);
// return $user->actions()->with('subject')->limit(5)->get();
// return "<a href='". route('task-manager.') ."'>Task Manager</a>";

Route::get('/', function () {
    return view('index');
});

Route::post('/', function(Request $request) {
    $dt = $request->due_to ? (new Carbon(((int) $request->due_to)))->timezone('Asia/Tehran')->seconds(0) : now();
    return $dt->format('Y-m-d H:i:s');
});
Route::get('/chart', function() {
    $user = User::first();
    $dt_from = Carbon::createFromFormat('Y-m-d', '2020-3-20')->setTime(0,0);
    $dt_to = Carbon::createFromFormat('Y-m-d', '2021-03-21')->setTime(0,0);
    $month_task = [
        'فروردین' => 0,
        'اردیبهشت' => 0,
        'خرداد' => 0,
        'تیر' => 0,
        'مرداد' => 0,
        'شهریور' => 0,
        'مهر' => 0,
        'آبان' => 0,
        'آذر' => 0,
        'دی' => 0,
        'بهمن' => 0,
        'اسفند' => 0,
    ];
    foreach ($tasks as $task) {
        $a = $month_day_numbers[0];
        for ($i=0; $i < 12; $i++) { 
            if ($dt_from->diffInDays($task->date) <= $a) {
                $month_task[$month_name[$i]] += $task->tasks;
                break;
            }
            $a += $month_day_numbers[$i];
        }
    }
    // return $month_task;
    $month_task = collect(array_values($month_task));
    return view('chart', compact('month_task', 'month_name'));
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
