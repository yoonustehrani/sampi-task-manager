<?php

namespace App\Listeners;

use App\Broadcasting\TelegramChannel;
use App\Notifications\TaskFinishedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendTaskFinishedNotification
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
        $users = $event->task->users;
        foreach ($users as $user) {
            if ($user->id != $event->task->finisher_id) {
                if ($user->telegram_chat_id) {
                    $user->notifyNow(new TaskFinishedNotification([TelegramChannel::class], $event->task));
                }
                if ($user->email) {
                    // $user->notifyNow(new TaskCreatedNotification(['mail'], $event->task));
                }
            }
        }
    }
}
