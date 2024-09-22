<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    public function store(Request $request){
        return Todo::create([
            'title' => $request->title
        ]);
    }

    public function update(Request $request, Todo $todo){
        $todo->update($request->only(['completed']));
        return response()->json($todo);
    }

    public function markCompleted($todo_id){
        $todo = Todo::find($todo_id);
        $todo->update(['completed'=>1]);
        return response()->json($todo);
    }
}
