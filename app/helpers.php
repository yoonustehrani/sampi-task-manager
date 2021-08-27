<?php

if (! function_exists('b4_random_color_class')) {
    function b4_random_color_class()
    {
        $colors = ['dark', 'danger', 'primary', 'info', 'warning', 'success', 'light', 'secondary'];
        return $colors[rand(0, count($colors) - 1)];
    }
}


if (! function_exists('flash')) {
    function flash($title = NULL,$msg = NULL)
    {
        $flash = new \App\Http\Tools\Flash;
        if (func_num_args() == 0) {
            return $flash;
        }
        return $flash->info($title,$msg);
    }
}

