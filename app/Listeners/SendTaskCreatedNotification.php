<?php

namespace App\Listeners;

use App\Broadcasting\TelegramChannel;
use App\Notifications\TaskCreatedNotification;
use App\Notifications\WorkspaceNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendTaskCreatedNotification
{
    
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        
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
            if ($user->telegram_chat_id) {
                $user->notifyNow(new TaskCreatedNotification([TelegramChannel::class], $event->task));
            }
            if ($user->email) {
                // $user->notifyNow(new TaskCreatedNotification(['mail'], $event->task));
            }
        }
    }
}
