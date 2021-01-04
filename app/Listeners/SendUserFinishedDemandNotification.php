<?php

namespace App\Listeners;

use App\Events\UserFinishedDemand;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserFinishedDemandNotification
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
     * @param  UserFinishedDemand  $event
     * @return void
     */
    public function handle(UserFinishedDemand $event)
    {
        //
    }
}
