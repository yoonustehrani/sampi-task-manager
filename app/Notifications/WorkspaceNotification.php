<?php

namespace App\Notifications;

use App\Http\Tools\TelegramBot;
use App\Workspace;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WorkspaceNotification extends Notification
{
    use Queueable;
    public $via;
    public $workspace;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($via, Workspace $workspace)
    {
        $this->via = $via;
        $this->workspace = $workspace;
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
        $workspace_url = route('task-manager.workspaces.show', ['workspace' => $this->workspace->id]);
        return (new MailMessage)
                    ->greeting("$notifiable->fullname عزیز سلام")
                    ->line("پروژه {$this->workspace->title} در سیستم مدیریت پروژه Sampi ایجاد شده است.")
                    ->action('مشاهده پروژه', $workspace_url)
                    ->line('موفق و پیروز باشید.');
    }

    public function toTelegram($notifiable)
    {
        $chat_id = $notifiable->telegram_chat_id;
        $workspace_url = route('task-manager.workspaces.show', ['workspace' => $this->workspace->id]);
        $text = "
{$notifiable->fullname} عزیز
پروژه <a href=\"{$workspace_url}\">{$this->workspace->title}</a> در سیستم مدیریت پروژه Sampi ایجاد شده است.
        ";
        $tg = new TelegramBot(config('services.telegram.task_manager.bot_token'));
        $keyboard = [
            'inline_keyboard' => [[
                [
                    'text' => 'مشاهده پروژه ' . $this->workspace->title,
                    'url' => $workspace_url
                ]
            ]],
        ];
        try {
            $res = [];
            if ($this->workspace->avatar_pic) {
                $res = $tg->sendPhoto(
                    $chat_id,
                    "http://ourobot.ir/{$this->workspace->avatar_pic}",
                    ['parse_mode' => 'HTML', 'caption' => trim($text), 'reply_markup' => json_encode($keyboard)]
                );
            } else {
                $res = $tg->sendMessage(
                    $chat_id,
                    trim($text),
                    ['parse_mode' => 'HTML', 'reply_markup' => json_encode($keyboard)]
                );
            }
            $content = json_decode((string) $res, true);
            if ($content['ok'] && $content['result']) {
                $tg->pinChatMessage($chat_id, $content['result']['message_id']);
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
