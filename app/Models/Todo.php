<?php

namespace App\Models;

use App\Models\Scopes\ArchiveScope;
use App\Traits\Taskable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory, Taskable;

    protected $fillable = ['title', 'progress', 'archived_at'];

    protected static function booted(): void{
        static::addGlobalScope(new ArchiveScope);
    }

    public function markProgress($progress){
        return $this->update(['progress' => $progress]);
    }

    public function getIsCompletedAttribute(){
        return $this->progress === 'completed';
    }

    public function archive(){
        $this->archived_at = now();
        $this->update();
    }
}