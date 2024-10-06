<?php

namespace App\Models;

use App\Traits\Taskable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubTask extends Model
{
    use HasFactory, Taskable;

    protected $fillable = ['body', 'is_task'];

    protected $casts = ['is_task' => 'boolean'];
}
