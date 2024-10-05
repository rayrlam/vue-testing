<?php

namespace App\Models;

use App\Models\Scopes\ArchiveScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title','completed', 'completed_at','archived_at'];

    protected static function booted(): void{
        static::addGlobalScope(new ArchiveScope);
    }

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

    public function subTasks(): MorphMany{
        return $this->morphMany(SubTask::class, 'taskable');
    }
}