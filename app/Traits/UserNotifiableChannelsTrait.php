<?php

namespace App\Traits;

trait UserNotifiableChannelsTrait
{
    public function user_channels(\App\User $user)
    {
        $channels = [];
        if ($user->telegram_chat_id) {
            array_push($channels, TelegramChannel::class);
        }
        if ($user->email) {
            array_push($channels, 'mail');
        }
        return $channels;
    }
}