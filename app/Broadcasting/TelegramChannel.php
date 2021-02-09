<?php

namespace App\Broadcasting;

use App\Http\Tools\TelegramBot;
use App\User;
use Illuminate\Notifications\Notification;

class TelegramChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function send($notifiable, Notification $notification)
    {
        $notification->toTelegram($notifiable);
    }
}
