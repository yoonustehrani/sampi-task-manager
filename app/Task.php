<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Nicolaslopezj\Searchable\SearchableTrait;

class Task extends Model
{
    use SoftDeletes, SearchableTrait;
    protected $fillable = ['title', 'description', 'parent_id', 'group', 'workspace_id', 'creator_id', 'finisher_id', 'priority_id', 'due_to', 'finished_at'];
    protected $dates = [
        'due_to', 'created_at', 'updated_at', 'deleted_at'
    ];
    protected $casts = [
        // 'due_to' => 'datetime',
        'date'   => 'datetime',
    ];
    protected $hidden = ['pivot'];
    public $searchable = [
        'columns' => [
            'title' => 10,
            'description' => 8,
            'group' => 6
        ]
    ];
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function finisher()
    {
        return $this->belongsTo(User::class, 'finisher_id');
    }
    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
    public function parent()
    {
        return $this->belongsTo(Task::class, 'parent_id');
    }
    public function children()
    {
        return $this->hasMany(Task::class, 'parent_id');
    }
    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }


    public function finished()
    {
        return $this->whereNotNull('finished_at');
    }
    public function unfinished()
    {
        return $this->whereNull('finished_at');
    }
    public function expired()
    {
        return $this->whereNotNull('due_to')->where('due_to', '<', now('Asia/Tehran'));
    }

    public function setDueToAttribute($date)
    {
        if ($date) {
            $this->attributes['due_to'] = Carbon::parse($date)->tz(config('app.timezone'));
        }
        return $date;
    }
}
