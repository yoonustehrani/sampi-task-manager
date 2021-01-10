<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Nicolaslopezj\Searchable\SearchableTrait;

class Task extends Model
{
    use SoftDeletes, SearchableTrait;
    protected $fillable = ['title', 'description', 'parent_id', 'group', 'workspace_id', 'creator_id', 'finisher_id', 'priority_id', 'due_to', 'finished_at'];
    protected $casts = [
        'due_to' => 'datetime',
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
    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
}
