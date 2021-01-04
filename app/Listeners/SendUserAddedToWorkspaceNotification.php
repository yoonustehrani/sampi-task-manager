<?php

namespace App\Listeners;

use App\Events\UserAddedToWorkspace;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserAddedToWorkspaceNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserAddedToWorkspace  $event
     * @return void
     */
    public function handle(UserAddedToWorkspace $event)
    {
        //
    }
}
