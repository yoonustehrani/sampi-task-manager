<?php

namespace App;

use App\Traits\RoleAndPermissionTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable
{
    use Notifiable, RoleAndPermissionTrait, SoftDeletes, LogsActivity, CausesActivity;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'first_name', 'last_name', 'avatar_pic', 'telegram_chat_id'
    ];
    protected static $logFillable = true;
    protected static $logName = 'task-manager-activities';
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['fullname'];

    public function workspaces()
    {
        return $this->belongsToMany(Workspace::class)->withPivot('is_admin');
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class);
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
        return $this->hasMany(Demand::class, 'from_id');
    }
    public function asked_demands()
    {
        return $this->hasMany(Demand::class, 'to_id');
    }
    public function getFullnameAttribute()
    {
        return "{$this->first_name}" . ($this->last_name ? " {$this->last_name}" : '');
    }
}
