<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Nicolaslopezj\Searchable\SearchableTrait;

class Demand extends Model
{
    use SoftDeletes, SearchableTrait;
    public $searchable = [
        'columns' => [
            'title' => 10,
        ]
    ];
    protected $casts = [
        'finished_at' => 'datetime',
    ];
    public function from()
    {
        return $this->belongsTo(User::class, 'from_id');
    }
    public function to()
    {
        return $this->belongsTo(User::class, 'to_id');
    }
    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
    public function messages()
    {
        return $this->hasMany(DemandMessage::class);
    }
    public function unread_messages()
    {
        return $this->messages()->whereNull('read_at');
    }
    public function read_unread_messages($user_id)
    {
        $unread_messages = $this->unread_messages();
        if ($this->from_id == $user_id || $this->to_id == $user_id) {
            if ($user_id == $this->to_id) {
                $unread_messages = $unread_messages->where('user_id', $this->from_id);
            } else {
                $unread_messages = $unread_messages->where('user_id', $this->to_id);
            }
            $unread_messages->update(['read_at' => now()]);
            return true;
        }
        return false;
    }
}
