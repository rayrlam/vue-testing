<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\SubTask;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SubTaskController extends Controller
{

    
    public function store($type, $type_id, Request $request){
        if($class = $this->getClass($type)){
            $model = $class::findOrFail($type_id);
            $model->subTasks()->create([
                'body' => $request->body,
                'is_task' => $request->is_task
            ]);
    
            return response()->json($model, 201);
        }

        return response()->json([
            'error' => 'Bad Request',
            'message' => 'Invalid Type Error'
        ], 400); 
    }

    private function getClass($type){
        switch($type){
            case 'todo':
                return Todo::class; 
            case 'subtask':
                return SubTask::class; 
        } 
        return null;
    }
}
