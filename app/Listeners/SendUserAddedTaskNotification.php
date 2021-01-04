<?php

namespace App\Listeners;

use App\Events\UserAddedTask;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserAddedTaskNotification
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
     * @param  UserAddedTask  $event
     * @return void
     */
    public function handle(UserAddedTask $event)
    {
        //
    }
}
