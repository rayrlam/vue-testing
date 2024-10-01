<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title','completed', 'completed_at','archived_at'];

    public function markCompleted(){
        return $this->update(['completed' => 1]);
    }

    public function markUncomplete(){
        return $this->update(['completed' => 0]);
    }

    public function getIsCompletedAttribute(){
        return !!$this->completed;
    }

    public function archive(){
        $this->archived_at = now();
        $this->update();
    }
}