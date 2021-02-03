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
    public function carbon_date($date_string, $format = 'Y-m-d', $zero_hourse = true)
    {
        $date = Carbon::createFromFormat($format, $date_string);
        if ($zero_hourse) {
            $date->setTime(0,0);
        }
        return $date;
    }
}