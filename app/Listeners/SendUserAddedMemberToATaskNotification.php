<?php

namespace App\Listeners;

use App\Events\UserAddedMemberToATask;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserAddedMemberToATaskNotification
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
     * @param  UserAddedMemberToATask  $event
     * @return void
     */
    public function handle(UserAddedMemberToATask $event)
    {
        //
    }
}
