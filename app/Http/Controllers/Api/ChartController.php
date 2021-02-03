<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ChartTrait;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ChartController extends Controller
{
    use ChartTrait;

    public function completed(Request $request)
    {
        // $request->validate([
        //     'start_date' => 'required|date',
        //     'end_date' => 'required|date'
        // ]);
        $user = $request->user(); 
        $dt_from = $this->carbon_date('2020-12-21');
        $dt_to = $this->carbon_date('2021-1-20');
        $craeted_tasks = $this->created_tasks($user, $dt_from, $dt_to);
        $finished_tasks = $this->finished_tasks($user, $dt_from, $dt_to);
        /**
         * Creating Month days Array
         * Runs a loop and add days to the $dt_from using as Array Key
         */
        $target_days = $this->month_days('2020-12-21', $dt_from->diffInDays($dt_to), ['created' => 0, 'finished' => 0]);
        /**
         * Loop $created_tasks and determines the created amount of the specified date
         */
        foreach ($craeted_tasks as $task_day) {
            $target_days[$task_day->date->format('Y-m-d')]['created'] = $task_day->tasks;
        }
        /**
         * Loop $finished_tasks and determines the finished amount of the specified date
         */
        foreach ($finished_tasks as $finished) {
            $target_days[$finished->date->format('Y-m-d')]['finished'] = $finished->tasks;
        }
        $finished_count = 0;
        $created_count = 0;
        foreach ($target_days as $date => $value) {
            $created_count += $value['created'];
            $finished_count += $value['finished'];
            $target_days[$date]['created'] = $created_count;
            $target_days[$date]['finished'] = $finished_count;
            $target_days[$date]['percentage'] = round($finished_count / $created_count, 3) * 100;
        }
        return $target_days;
    }
    public function ontime(Request $request)
    {
        $user = $request->user(); 
        $dt_from = $this->carbon_date('2020-12-21');
        $dt_to = $this->carbon_date('2021-1-20');
        $craeted_tasks = $this->created_tasks($user, $dt_from, $dt_to);
        $ontime_tasks  = $this->ontime_tasks($user, $dt_from, $dt_to);
        $target_days = $this->month_days('2020-12-21', $dt_from->diffInDays($dt_to), ['created' => 0, 'ontime' => 0]);
        /**
         * Loop $created_tasks and determines the created amount of the specified date
         */
        foreach ($craeted_tasks as $task_day) {
            $target_days[$task_day->date->format('Y-m-d')]['created'] = $task_day->tasks;
        }
        /**
         * Loop $finished_tasks and determines the finished amount of the specified date
         */
        foreach ($ontime_tasks as $ontime) {
            $target_days[$ontime->date->format('Y-m-d')]['ontime'] = $ontime->tasks;
        }
        $ontime_count = 0;
        $created_count = 0;
        foreach ($target_days as $date => $value) {
            $created_count += $value['created'];
            $ontime_count += $value['ontime'];
            $target_days[$date]['created'] = $created_count;
            $target_days[$date]['ontime'] = $ontime_count;
            $target_days[$date]['percentage'] = round($ontime_count / $created_count, 3) * 100;
        }
        return $target_days;
    }
    public function yearly(Request $request)
    {
        // $request->validate([
        //     'start_date' => 'required|date',
        //     'end_date' => 'required|date'
        // ]);
        $dt_from = $this->carbon_date('2020-3-20');
        $dt_to = $this->carbon_date('2021-3-21');
        $month_day_numbers = [31,31,31,31,31,31,30,30,30,30,30,29];
        $month_day_numbers[11] = ($dt_from->diffInDays($dt_to) == 366) ? 30 : 29;
        $month = [
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
        $month_name = array_keys($month);
        $tasks = $this->created_tasks($request->user(), $dt_from, $dt_to);
        foreach ($tasks as $task) {
            $a = $month_day_numbers[0];
            for ($i=0; $i < 12; $i++) { 
                $diff = $task->date->diffInDays($dt_from) + 1;
                if ($diff < $a) {
                    $month[$month_name[$i]] += $task->tasks;
                    break;
                }
                $a += $month_day_numbers[$i];
            }
        }
        return [
            'labels' => $month_name,
            'values' => array_values($month)
        ];
    }
}