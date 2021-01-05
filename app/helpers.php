<?php

function b4_random_color_class()
{
    $colors = ['dark', 'danger', 'primary', 'info', 'warning', 'success', 'light', 'secondary'];
    return $colors[rand(0, count($colors) - 1)];
}