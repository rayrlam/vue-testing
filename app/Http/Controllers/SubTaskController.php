<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubTaskRequest;
use App\Models\SubTask;

class SubTaskController extends Controller
{
    public function store(SubTaskRequest $request){
        $subtask = SubTask::create($request->validated());
        return response()->json($subtask, 201);
    }
}
