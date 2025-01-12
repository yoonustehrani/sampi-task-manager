<?php

namespace App\Listeners;

use App\Broadcasting\TelegramChannel;
use App\Notifications\DemandCreatedNotification;
use App\Traits\UserNotifiableChannelsTrait;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendDemandCreatedNotification
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
        $user = $event->demand->to;
        $channels = $this->user_channels($user);
        if (count($channels) > 0) {
            $user->notifyNow(new DemandCreatedNotification($channels, $event->demand));
        }
    }
}
