<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    public function store(TodoRequest $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = Todo::create($validated);

        return response()->json($todo, 201);
    }

    public function update(Request $request, Todo $todo){
        $todo->update($request->only(['completed']));
        return response()->json($todo);
    }

    public function markCompleted($todo_id){
        $todo = Todo::find($todo_id);
        $todo->markCompleted();
        return response()->json($todo);
    }
}
