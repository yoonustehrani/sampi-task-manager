<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DemandMessage extends Model
{
    protected $fillable = ['user_id', 'text'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
