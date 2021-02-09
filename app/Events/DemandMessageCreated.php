<?php

namespace App\Events;

use App\Demand;
use App\DemandMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DemandMessageCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $demand;
    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Demand $demand, DemandMessage $message)
    {
        $this->demand = $demand;
        $this->message = $message;
    }
}
