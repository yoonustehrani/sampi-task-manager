<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
}
