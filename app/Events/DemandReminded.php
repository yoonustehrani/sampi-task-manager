<?php

namespace App\Events;

use App\Demand;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DemandReminded
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $demand;
    public $side;
    public $reminder;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Demand $demand, $side, $reminder)
    {
        $this->demand = $demand;
        $this->side = $side;
        $this->reminder = $reminder;
    }
}
