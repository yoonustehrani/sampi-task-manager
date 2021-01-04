<?php

namespace App\Listeners;

use App\Events\UserUpdatedTask;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserUpdatedTaskNotification
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
     * @param  UserUpdatedTask  $event
     * @return void
     */
    public function handle(UserUpdatedTask $event)
    {
        //
    }
}
