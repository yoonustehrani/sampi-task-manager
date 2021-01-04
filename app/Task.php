<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;
    protected $casts = [
        'due_to' => 'datetime',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
}
