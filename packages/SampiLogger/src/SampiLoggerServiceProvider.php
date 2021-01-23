<?php

namespace SampiLogger;

use Illuminate\Support\ServiceProvider;

class SampiLoggerServiceProvider extends ServiceProvider
{
    public function boot()
    {

    }
    public function register()
    {
        $this->app->bind('sampi_logger', function($app) {
            return new SampiLogger;
        });
        $this->mergeConfigFrom(__DIR__ . "/config/logger.php", 'Lcfg');
    }
}