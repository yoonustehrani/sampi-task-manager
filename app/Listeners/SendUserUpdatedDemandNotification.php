<?php

namespace App\Listeners;

use App\Events\UserUpdatedDemand;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserUpdatedDemandNotification
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
     * @param  UserUpdatedDemand  $event
     * @return void
     */
    public function handle(UserUpdatedDemand $event)
    {
        //
    }
}
