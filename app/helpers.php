<?php

function b4_random_color_class()
{
    $colors = ['dark', 'danger', 'primary', 'info', 'warning', 'success', 'light', 'secondary'];
    return $colors[rand(0, count($colors) - 1)];
}

function flash($title = NULL,$msg = NULL)
{
    $flash = new \App\Http\Tools\Flash;
    if (func_num_args() == 0) {
        return $flash;
    }
    return $flash->info($title,$msg);
}