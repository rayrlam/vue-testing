<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class SubTask extends Model
{
    use HasFactory;

    protected $fillable = ['body', 'is_task'];

    protected $casts = ['is_task' => 'boolean'];

    public function subTasks():MorphMany{
        return $this->morphMany(SubTask::class, 'taskable');
    }   
}
