<?php

namespace App\Listeners;

use App\Broadcasting\TelegramChannel;
use App\Notifications\WorkspaceNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendWorkspaceCreatedNotification
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
        $users = $event->workspace->users;
        foreach ($users as $user) {
            if ($user->telegram_chat_id) {
                $user->notifyNow(new WorkspaceNotification([TelegramChannel::class], $event->workspace));
            }
        }
    }
}
