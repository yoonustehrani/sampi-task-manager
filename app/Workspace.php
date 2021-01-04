<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workspace extends Model
{
    use SoftDeletes;
    public function users()
    {
        return $this->belongsToMany(User::class);
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
    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
}
