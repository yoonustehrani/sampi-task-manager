<?php

use App\Broadcasting\TelegramChannel;
use App\Events\WorkspaceCreated;
use App\Notifications\WorkspaceNotification;
use App\User;
use App\Workspace;
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
    $user = auth()->user() ?: \Auth::loginUsingId(2);
    $workspace = Workspace::first();
    $user->notifyNow(new WorkspaceNotification(['mail'], $workspace));
    return 'sent !';
    return view('index');
});

Route::post('/', function(Request $request) {
    $dt = $request->due_to ? (new Carbon(((int) $request->due_to)))->timezone('Asia/Tehran')->seconds(0) : now();
    return $dt->format('Y-m-d H:i:s');
});
Route::get('/chart', function() {
    $user = User::first();
    $dt_from = Carbon::createFromFormat('Y-m-d', '2020-12-21')->setTime(0,0);
    $dt_to = Carbon::createFromFormat('Y-m-d', '2021-01-20')->setTime(0,0);
    $craeted_tasks = $user->tasks()
        ->where('created_at', '<', $dt_to)
        ->where('created_at', '>=', $dt_from)
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get([
            \DB::raw("COUNT(*) tasks, DATE_FORMAT(created_at, '%Y-%m-%e') date")
        ]);
    $finished_tasks = $user->tasks()
    ->where('finished_at', '<', $dt_to)
    ->where('finished_at', '>=', $dt_from)
    ->whereNotNull('finished_at')
    ->groupBy('date')
    ->orderBy('date', 'asc')
    ->get([
        \DB::raw("COUNT(*) tasks, DATE_FORMAT(finished_at, '%Y-%m-%e') date")
    ]);
    $total_count = 0;
    $finished_count = 0;
    $target_task_days = collect([]);
    foreach ($craeted_tasks as $task_day) {
        $total_count += $task_day->tasks;
        $task_day->total = $total_count;
        foreach ($finished_tasks as $finished) {
            if ($finished->date->diffInSeconds($task_day->date) == 0) {
                $finished_count += $finished->tasks;
                break;
            }
        }
        $task_day->finished = $finished_count;
        $task_day->percentage = round($finished_count / $total_count, 2) * 100;
        $target_task_days->push($task_day);
    }
    $task_days = $target_task_days;
    return view('chart', compact('task_days'));
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
    Route::resource('workspaces/{workspace}/demands', 'DemandController');
    Route::resource('tasks', 'TaskController')->only('index', 'show');
    Route::get('demands', 'DemandController@mixed')->name('demands.mixed');
    // Route::get('workspaces/{workspace}/tasks/{}', 'TaskController@index');
});

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');
