<?php

namespace App\Traits;

use Carbon\Carbon;

trait ChartTrait
{
    public function created_tasks($user, $from_date, $end_date) 
    {
        return $user->tasks()
            ->where('created_at', '<', $end_date)
            ->where('created_at', '>=', $from_date)
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get([
                \DB::raw("COUNT(*) tasks, DATE_FORMAT(created_at, '%Y-%m-%e') date")
            ]);
    }
    public function finished_tasks($user, $from_date, $end_date) 
    {
        return $user->tasks()
            ->where('finished_at', '<', $end_date)
            ->where('finished_at', '>=', $from_date)
            ->whereNotNull('finished_at')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get([
                \DB::raw("COUNT(*) tasks, DATE_FORMAT(finished_at, '%Y-%m-%e') date")
            ]);
    }
    public function ontime_tasks($user, $from_date, $end_date)
    {
        return $user->tasks()
        ->where('finished_at', '<', $end_date)
        ->where('finished_at', '>=', $from_date)
        ->whereNotNull('finished_at')
        ->whereNotNull('due_to')
        ->whereColumn('finished_at', '<=', 'due_to')
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get([
            \DB::raw("COUNT(*) tasks, DATE_FORMAT(finished_at, '%Y-%m-%e') date")
        ]);
    }
    public function month_days($date , $diffdays, $custom_value = [])
    {
        $target_days = collect([]);
        $first_date = $this->carbon_date($date);
        for ($i=0; $i < $diffdays; $i++) { 
            $days_to_add = $i == 0 ? 0 : 1;
            $target_days->put($first_date->addDays($days_to_add)->format('Y-m-d'), $custom_value);
        }
        return $target_days->toArray();
    }
    public function carbon_date($date_string, $format = 'Y-m-d', $zero_hourse = true)
    {
        $date = Carbon::createFromFormat($format, $date_string);
        if ($zero_hourse) {
            $date->setTime(0,0);
        }
        return $date;
    }
}