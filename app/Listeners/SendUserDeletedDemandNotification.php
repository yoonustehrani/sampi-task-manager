<?php

namespace App\Listeners;

use App\Events\UserDeletedDemand;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserDeletedDemandNotification
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
     * @param  UserDeletedDemand  $event
     * @return void
     */
    public function handle(UserDeletedDemand $event)
    {
        //
    }
}
