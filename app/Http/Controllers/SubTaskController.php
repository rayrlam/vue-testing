<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SubTaskController extends Controller
{
    public function store(Todo $todo, Request $request){
        $todo->subTasks()->create([
            'body' => $request->body,
            'is_task' => $request->is_task
        ]);

        return response()->json($todo, 201);
    }
}
