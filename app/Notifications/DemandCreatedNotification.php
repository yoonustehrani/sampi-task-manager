<?php

namespace App\Notifications;

use App\Http\Tools\TelegramBot;
use App\Traits\TelegramEmojies;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DemandCreatedNotification extends Notification
{
    use Queueable, TelegramEmojies;
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
                    ->subject("درخواست {$demand->from->fullname} از شما - {$demand->title}")
                    ->greeting("$notifiable->fullname عزیز سلام")
                    ->line("{$demand->from->fullname} درخواست جدیدی با عنوان {$demand->title} از شما دارد.")
                    ->action('مشاهده درخواست', $demand_url)
                    ->line('موفق و پیروز باشید !');
    }

    public function toTelegram($notifiable)
    {
        $chat_id = $notifiable->telegram_chat_id;
        $demand = $this->demand;
        $workspace_url = route('task-manager.workspaces.show', ['workspace' => $demand->workspace_id]);
        $demand_url = route('task-manager.demands.show', ['workspace' => $demand->workspace_id, 'demand' => $demand->id]);
        $from = "";
        if ($demand->from) {
            $from .= "درخواست دهنده : ";
            if ($demand->from->telegram_chat_id) {
                $from .= "<a href=\"tg://user?id={$demand->from->telegram_chat_id}\">{$demand->from->fullname}</a>\n";
            } else {
                $from .= "{$demand->from->fullname}\n";
            }
        }
        $text = "
{$this->emojies['person']}{$notifiable->fullname} عزیز


{$this->emojies['letter-in']} {$this->emojies['new']} درخواستی جدید با عنوان <b>{$demand->title}</b> در پروژه <a href=\"{$workspace_url}\">{$demand->workspace->title}</a> در سیستم مدیریت پروژه Sampi ایجاد شده است.
{$from}
Sampi Task Manager";
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
                    config('app.url') . "/{$demand->workspace->avatar_pic}",
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
