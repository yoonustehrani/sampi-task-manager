<?php

namespace App\Notifications;

use App\Http\Tools\TelegramBot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DemandFinishedNotification extends Notification
{
    use Queueable;
    public $via;
    public $demand;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($via, $demand)
    {
        $this->via = $via;
        $this->demand = $demand;
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
                    ->subject("اتمام درخواست {$demand->title}")
                    ->greeting("{$notifiable->fullname} عزیز سلام")
                    ->line("درخواست شما مبنی بر {$demand->title} توسط {$demand->to->fullname} بسته شده است.")
                    ->action('مشاهده درخواست', $demand_url)
                    ->line('موفق و پیروز باشید !');
    }

    public function toTelegram($notifiable)
    {
        $chat_id = $notifiable->telegram_chat_id;
        $demand = $this->demand;
        $workspace_url = route('task-manager.workspaces.show', ['workspace' => $demand->workspace_id]);
        $demand_url = route('task-manager.demands.show', ['workspace' => $demand->workspace_id, 'demand' => $demand->id]);
        $to = "طرف مقابل";
        if ($demand->to) {
            if ($demand->to->telegram_chat_id) {
                $to = "<a href=\"tg://user?id={$demand->to->telegram_chat_id}\">{$demand->to->fullname}</a>\n";
            } else {
                $to = "{$demand->to->fullname}\n";
            }
        }
        $text = "
{$notifiable->fullname} عزیز
درخواست شما تحت عنوان <b>{$demand->title}</b> توسط {$to} بسته شده است.
- پروژه <a href=\"{$workspace_url}\">{$demand->workspace->title}</a>

Sampi Task Manager (http://ourobot.ir)";
        $tg = new TelegramBot(config('services.telegram.task_manager.bot_token'));
        $keyboard = [
            'inline_keyboard' => [[
                [
                    'text' => 'مشاهده پروژه ' . $demand->workspace->title,
                    'url' => $workspace_url
                ],
                [
                    'text' => 'مشاهده درخواست',
                    'url' => $demand_url
                ], 
            ]],
        ];
        try {
            $res = [];
            if ($demand->workspace->avatar_pic) {
                $res = $tg->sendPhoto(
                    $chat_id,
                    "http://ourobot.ir/{$demand->workspace->avatar_pic}",
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