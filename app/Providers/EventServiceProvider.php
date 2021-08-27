<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        // \App\Events\UserAddedMemberToATask::class => [
        //     '\App\Listeners\SendUserAddedMemberToATaskNotification'
        // ],
        // \App\Events\UserAddedTask::class => [
        //     '\App\Listeners\SendUserAddedTaskNotification'
        // ],
        // \App\Events\UserAddedToWorkspace::class => [
        //     '\App\Listeners\SendUserAddedToWorkspaceNotification'
        // ],
        // \App\Events\UserAskedForDemand::class => [
        //     '\App\Listeners\SendUserAskedForDemandNotification'
        // ],
        // \App\Events\UserDeletedDemand::class => [
        //     '\App\Listeners\SendUserDeletedDemandNotification'
        // ],
        // \App\Events\UserDeletedTask::class => [
        //     '\App\Listeners\SendUserDeletedTaskNotification'
        // ],
        // \App\Events\UserFinishedDemand::class => [
        //     '\App\Listeners\SendUserFinishedDemandNotification'
        // ],
        // \App\Events\UserFinishedTask::class => [
        //     '\App\Listeners\SendUserFinishedTaskNotification'
        // ],
        // \App\Events\UserUpdatedDemand::class => [
        //     '\App\Listeners\SendUserUpdatedDemandNotification'
        // ],
        // \App\Events\UserUpdatedTask::class => [
        //     '\App\Listeners\SendUserUpdatedTaskNotification'
        // ],
        \App\Events\WorkspaceCreated::class => [
            \App\Listeners\SendWorkspaceCreatedNotification::class
        ],
        \App\Events\TaskCreated::class => [
            \App\Listeners\SendTaskCreatedNotification::class
        ],
        \App\Events\TaskFinished::class => [
            \App\Listeners\SendTaskFinishedNotification::class
        ],
        \App\Events\DemandCreated::class => [
            \App\Listeners\SendDemandCreatedNotification::class
        ],
        \App\Events\DemandMessageCreated::class => [
            \App\Listeners\SendDemandMessageCreatedNotification::class
        ],
        \App\Events\DemandFinished::class => [
            \App\Listeners\SendDemandFinishedNotification::class
        ],
        \App\Events\DemandReminded::class => [
            \App\Listeners\SendDemandRemindedNotification::class
        ],
        \App\Events\TaskReminded::class => [
            \App\Listeners\SendTaskRemindedNotification::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
