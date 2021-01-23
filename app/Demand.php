<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Demand extends Model
{
    use SoftDeletes;
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
}
