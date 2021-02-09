<?php

namespace App\Notifications;

use App\Http\Tools\TelegramBot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DemandCreatedNotification extends Notification
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
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    public function toTelegram($notifiable)
    {
        $chat_id = $notifiable->telegram_chat_id;
        $demand = $this->task;
        $workspace_url = "http://ourobot.ir/task-manager/workspaces/{$demand->workspace->id}";
        $demand_url = "http://ourobot.ir/task-manager/demands/{$demand->id}";    
        $users = "";
        if (count($demand->users) > 1) {
            $users .= "کاربران : \n";
            foreach ($demand->users as $user) {
                if ($user->telegram_chat_id) {
                    $users .= "<a href=\"tg://user?id={$user->telegram_chat_id}\">{$user->fullname}</a>\n";
                } else {
                    $users .= "{$user->fullname}\n";
                }
            }
        }
        $text = "
{$notifiable->fullname} عزیز
مسئولیت جدید با عنوان <b>{$demand->title}</b> در پروژه <a href=\"{$workspace_url}\">{$demand->workspace->title}</a> در سیستم مدیریت پروژه Sampi ایجاد شده است.
{$users}
Sampi Task Manager (http://ourobot.ir)";
        $tg = new TelegramBot(config('services.telegram.task_manager.bot_token'));
        $keyboard = [
            'inline_keyboard' => [[
                [
                    'text' => 'مشاهده پروژه ' . $demand->workspace->title,
                    'url' => $workspace_url
                ],
                [
                    'text' => 'مشاهده مسئولیت',
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
