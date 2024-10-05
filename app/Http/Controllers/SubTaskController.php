<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SubTaskRequest;
use App\Models\SubTask;

class SubTaskController extends Controller
{
    public function store(SubTaskRequest $request){
        $subtask = SubTask::create($request->validated());
        return response()->json([
            'body' => $request->body,
            'is_task' => $request->body,
        ], 201);
    }
}
