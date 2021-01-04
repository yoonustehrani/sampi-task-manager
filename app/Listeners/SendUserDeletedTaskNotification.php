<?php

namespace App\Listeners;

use App\Events\UserDeletedTask;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserDeletedTaskNotification
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
     * @param  UserDeletedTask  $event
     * @return void
     */
    public function handle(UserDeletedTask $event)
    {
        //
    }
}
