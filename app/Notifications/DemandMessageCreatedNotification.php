<?php

namespace App\Notifications;

use App\Http\Tools\TelegramBot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DemandMessageCreatedNotification extends Notification
{
    use Queueable;
    public $via;
    public $demand;
    public $message;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($via, $demand, $message)
    {
        $this->via = $via;
        $this->demand = $demand;
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return $this->via ?: ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $demand = $this->demand;
        $message = $this->message;
        $demand_url = route('task-manager.demands.show', ['workspace' => $demand->workspace_id, 'demand' => $demand->id]);  
        return (new MailMessage)
                    ->greeting("{$notifiable->fullname} عزیز سلام")
                    ->subject("پیام جدید از طرف {$message->user->fullname}")
                    ->line("پیام جدید از سوی {$message->user->fullname} برای درخواست {$demand->title} ارسال شده است.")
                    ->action('مشاهده پیام', $demand_url)
                    ->line('موفق و سربلند باشید !');
    }
    
    public function toTelegram($notifiable)
    {
        $chat_id = $notifiable->telegram_chat_id;
        $demand = $this->demand;
        $message = $this->message;
        $demand_url = "http://ourobot.ir/task-manager/workspaces/{$demand->workspace_id}/demands/{$demand->id}";    
        $from = "";
        if ($message->user) {
            if ($message->user->telegram_chat_id) {
                $from .= "<a href=\"tg://user?id={$message->user->telegram_chat_id}\">{$message->user->fullname}</a>\n";
            } else {
                $from .= "{$message->user->fullname}\n";
            }
        }
        $text = "
پیام جدید از سوی {$from} برای درخواست <b>{$demand->title}</b> ارسال شده است.
Sampi Task Manager";
        $tg = new TelegramBot(config('services.telegram.task_manager.bot_token'));
        $keyboard = [
            'inline_keyboard' => [[
                [
                    'text' => 'مشاهده',
                    'url' => $demand_url
                ], 
            ]],
        ];
        try {
            $res = [];
            if ($demand->workspace->avatar_pic) {
                $res = $tg->sendPhoto(
                    $chat_id,
                    config('app.url') . "$demand->workspace->avatar_pic}",
                    ['parse_mode' => 'HTML', 'caption' => trim($text), 'reply_markup' => json_encode($keyboard)]
                );
            } else {
                $res = $tg->sendMessage(
                    $chat_id,
                    trim($text),
                    ['parse_mode' => 'HTML', 'reply_markup' => json_encode($keyboard)]
                );
            }
            $res->close();
        } catch(\Exception $e) {
            \Log::error($e);
        }
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
