<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workspace extends Model
{
    use SoftDeletes;
    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('is_admin');
    }
    public function admins()
    {
        return $this->users()->wherePivot('is_admin', true)->withPivotValue('is_admin', true);
    }
    public function members()
    {
        return $this->users()->wherePivot('is_admin', false)->withPivotValue('is_admin', false);
    }
    
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function finished_tasks()
    {
        return $this->tasks()->whereNotNull('finished_at');
    }
    public function unfinished_tasks()
    {
        return $this->tasks()->whereNull('finished_at');
    }
    public function expired_tasks()
    {
        return $this->unfinished_tasks()->whereNotNull('due_to')->where('due_to', '<', now('Asia/Tehran'));
    }
    
    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
    public function demands_left()
    {
        return $this->hasMany(Demand::class)->whereNull('finished_at');
    }
}
