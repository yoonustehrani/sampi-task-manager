<?php

namespace App\Listeners;

use App\Events\UserAskedForDemand;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserAskedForDemandNotification
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
     * @param  UserAskedForDemand  $event
     * @return void
     */
    public function handle(UserAskedForDemand $event)
    {
        //
    }
}
