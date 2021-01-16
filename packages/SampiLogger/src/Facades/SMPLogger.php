<?php

namespace SampiLogger\Facades;

use Illuminate\Support\Facades\Facade;

class SMPLogger extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'sampi_logger';
    }
}