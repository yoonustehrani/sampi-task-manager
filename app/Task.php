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
    protected $fillable = ['title', 'description', 'parent_id', 'group', 'finisher_id', 'priority_id', 'due_to', 'finished_at'];
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
