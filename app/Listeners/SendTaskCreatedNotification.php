<?php

namespace App\Listeners;

use App\Broadcasting\TelegramChannel;
use App\Notifications\TaskCreatedNotification;
use App\Notifications\WorkspaceNotification;
use App\Traits\UserNotifiableChannelsTrait;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendTaskCreatedNotification
{
    use UserNotifiableChannelsTrait;
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
            $channels = $this->user_channels($user);
            if (count($channels) > 0) {
                $user->notifyNow(new TaskCreatedNotification($channels, $event->task));
            }
        }
    }
}
