<?php

namespace App\Listeners;

use App\Broadcasting\TelegramChannel;
use App\Notifications\DemandMessageCreatedNotification;
use App\Traits\UserNotifiableChannelsTrait;
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
                $channels = $this->user_channels($user);
                if (count($channels) > 0) {
                    $user->notifyNow(new DemandMessageCreatedNotification($channels, $event->demand, $event->message));
                }
            }
        }
    }
}
