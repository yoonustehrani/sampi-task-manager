<?php

namespace App\Listeners;

use App\Broadcasting\TelegramChannel;
use App\Notifications\DemandMessageCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendDemandMessageCreatedNotification
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
        $users = [$event->demand->to, $event->demand->from];
        foreach($users as $user) {
            if ($user->telegram_chat_id && ($event->message->user_id != $user->id)) {
                $user->notifyNow(new DemandMessageCreatedNotification([TelegramChannel::class], $event->demand, $event->message));
            }
        }
    }
}
