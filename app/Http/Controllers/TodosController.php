<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    public function index(){
        return response()->json([
            'todos' => Todo::all(),

        ]); 
        
    }

    public function store(TodoRequest $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = Todo::create($validated);

        return response()->json($todo, 201);
    }

    public function update(TodoRequest $request, Todo $todo){
        $todo->update($request->only(['title']));
        return response()->json($todo);
    }

    public function markUncomplete($todo_id){
        $todo = Todo::find($todo_id);
        $todo->markUncomplete();
        return response()->json($todo);
    }

    public function markCompleted($todo_id){
        $todo = Todo::find($todo_id);
        $todo->markCompleted();
        return response()->json($todo);
    }
}
