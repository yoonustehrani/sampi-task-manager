<?php

namespace App\Listeners;

use App\Notifications\DemandRemindedNotification;
use App\Traits\UserNotifiableChannelsTrait;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendDemandRemindedNotification
{
    use UserNotifiableChannelsTrait;
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
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $user = $event->demand->{$event->side};
        $channels = $this->user_channels($user);
        if (count($channels) > 0) {
            $user->notifyNow(new DemandRemindedNotification($channels, $event->demand, $event->reminder));
        }
    }
}
