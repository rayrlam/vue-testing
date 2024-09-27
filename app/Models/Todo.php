<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title','completed'];

    public function markCompleted(){
        return $this->update(['completed' => 1]);
    }

    public function markUncomplete(){
        return $this->update(['completed' => 0]);
    }

    public function getIsCompletedAttribute(){
        return !!$this->completed;
    }
}