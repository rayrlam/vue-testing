<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;

class TodosController extends Controller
{
    public function index(){
        return response()->json([
            'todos' => Todo::orderBy('created_at', 'desc')->with('subtasks','subtasks.subtasks','subtasks.subtasks.subtasks')->get()
        ]); 
    }

    public function store(TodoRequest $request){
        $todo = Todo::create($request->validated());
        return response()->json($todo, 201);
    }

    public function update(TodoRequest $request, Todo $todo){
        $todo->update($request->only(['title']));
        return response()->json($todo);
    }

    public function progress(Todo $todo, $progress){
        $todo->markProgress($progress);
        return response()->json($todo);
    }

    public function archive(Todo $todo){
        $todo->archived_at = now();
        $todo->update();

        return response()->json([
            'message' => `{$todo->title} was archived.`
        ]);
    }
}
