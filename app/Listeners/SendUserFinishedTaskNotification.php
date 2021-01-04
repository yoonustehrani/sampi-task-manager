<?php

namespace App\Listeners;

use App\Events\UserFinishedTask;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserFinishedTaskNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserFinishedTask  $event
     * @return void
     */
    public function handle(UserFinishedTask $event)
    {
        //
    }
}
