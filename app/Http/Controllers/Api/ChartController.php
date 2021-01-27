<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ChartController extends Controller
{
    public function monthly(Request $request)
    {
        $user = $request->user(); 
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
        return $target_task_days;
    }
    public function yearly(Request $request)
    {
        $dt_from = Carbon::createFromFormat('Y-m-d', '2020-3-20')->setTime(0,0);
        $dt_to = Carbon::createFromFormat('Y-m-d', '2021-03-21')->setTime(0,0);
        $month_day_numbers = [31,31,31,31,31,31,30,30,30,30,30,29];
        $month_day_numbers[11] = ($dt_from->diffInDays($dt_to) == 366) ? 30 : 29;
        $month = collect([
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
        ]);
        $month_name = $month->keys();
        $tasks = $request->user()->tasks()
        ->where('created_at', '<', $dt_to)
        ->where('created_at', '>=', $dt_from)
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get([
            \DB::raw("COUNT(*) tasks, DATE_FORMAT(created_at, '%Y-%m-%e') date")
        ]);
        foreach ($tasks as $task) {
            $a = $month_day_numbers[0];
            for ($i=0; $i < 12; $i++) { 
                if ($dt_from->diffInDays($task->date) <= $a) {
                    $month[$month_name[$i]] += $task->tasks;
                    break;
                }
                $a += $month_day_numbers[$i];
            }
        }
        return [
            'labels' => $month_name,
            'values' => $month->values()
        ];
    }
}