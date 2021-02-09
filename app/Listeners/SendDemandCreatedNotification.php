<?php

namespace App\Listeners;

use App\Broadcasting\TelegramChannel;
use App\Notifications\DemandCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendDemandCreatedNotification
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
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $user = $event->demand->to;
        if ($user->telegram_chat_id) {
            $user->notifyNow(new DemandCreatedNotification([TelegramChannel::class], $event->demand));
        }
    }
}
