<?php

namespace App\Notifications;

use App\Http\Tools\TelegramBot;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskCreatedNotification extends Notification
{
    use Queueable;
    public $via;
    public $task;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($via, $task)
    {
        $this->via = $via;
        $this->task = $task;
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
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    public function toTelegram($notifiable)
    {
        $chat_id = $notifiable->telegram_chat_id;
        $task = $this->task;
        $workspace_url = "http://ourobot.ir/task-manager/workspaces/{$task->workspace->id}";
        $task_url = "http://ourobot.ir/task-manager/tasks/{$task->id}";    
        $users = "";
        if (count($task->users) > 1) {
            $users .= "کاربران : \n";
            foreach ($task->users as $user) {
                if ($user->telegram_chat_id) {
                    $users .= "<a href=\"tg://user?id={$user->telegram_chat_id}\">{$user->fullname}</a>\n";
                } else {
                    $users .= "{$user->fullname}\n";
                }
            }
        }
        $text = "
{$notifiable->fullname} عزیز
مسئولیت جدید با عنوان <b>{$task->title}</b> در پروژه <a href=\"{$workspace_url}\">{$task->workspace->title}</a> در سیستم مدیریت پروژه Sampi ایجاد شده است.
{$users}
Sampi Task Manager (http://ourobot.ir)";
        $tg = new TelegramBot(config('services.telegram.task_manager.bot_token'));
        $keyboard = [
            'inline_keyboard' => [[
                [
                    'text' => 'مشاهده پروژه ' . $task->workspace->title,
                    'url' => $workspace_url
                ],
                [
                    'text' => 'مشاهده مسئولیت',
                    'url' => $task_url
                ], 
            ]],
        ];
        try {
            $res = [];
            if ($task->workspace->avatar_pic) {
                $res = $tg->sendPhoto(
                    $chat_id,
                    "http://ourobot.ir/{$task->workspace->avatar_pic}",
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
