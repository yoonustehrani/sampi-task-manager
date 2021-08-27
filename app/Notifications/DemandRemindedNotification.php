<?php

namespace App\Notifications;

use App\Http\Tools\TelegramBot;
use App\Traits\TelegramEmojies;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DemandRemindedNotification extends Notification
{
    use Queueable, TelegramEmojies;
    public $via;
    public $demand;
    public $reminder;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($via, $demand, $reminder)
    {
        $this->via = $via;
        $this->demand = $demand;
        $this->reminder = $reminder;
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
        $demand_url = route('task-manager.demands.show', ['workspace' => $demand->workspace_id, 'demand' => $demand->id]);  
        return (new MailMessage)
                    ->greeting("{$notifiable->fullname} عزیز سلام")
                    ->subject("درخواست {$demand->title} را بازبینی کنید.")
                    ->line("{$this->reminder->fullname} از شما خواسته است تا درخواست {$demand->title} را هرچه سریعتر بررسی کنید.")
                    ->action('مشاهده درخواست', $demand_url)
                    ->line('موفق و پیروز باشید !');
    }


    public function toTelegram($notifiable)
    {
        $chat_id = $notifiable->telegram_chat_id;
        $demand = $this->demand;
        $demand_url = route('task-manager.demands.show', ['workspace' => $demand->workspace_id, 'demand' => $demand->id]);
        $demand_url = str_replace('localhost', 'localhost.net', $demand_url);
        $reminder = $this->reminder->telegram_chat_id ? "<a href=\"tg://user?id={$this->reminder->telegram_chat_id}\">{$this->reminder->fullname}</a>" : "{$this->reminder->fullname}";
        $text = "{$this->emojies['bell']} {$reminder} از شما خواسته است تا درخواست {$demand->title} را هرچه سریعتر بررسی کنید
\nباتشکر
Sampi Task Manager";
        $tg = new TelegramBot(config('services.telegram.task_manager.bot_token'));
        $keyboard = [
            'inline_keyboard' => [[
                [
                    'text' => 'مشاهده درخواست',
                    'url' => $demand_url
                ], 
            ]],
        ];
        try {
            $res = [];
            $res = $tg->sendMessage(
                $chat_id,
                trim($text),
                ['parse_mode' => 'HTML', 'reply_markup' => json_encode($keyboard)]
            );
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
