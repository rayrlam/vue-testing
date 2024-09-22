<?php

use App\Http\Controllers\TodosController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/todo', [TodosController::class,'store']);
Route::patch('/todo/{todo}', [TodosController::class, 'update'])->name('todo.update');
Route::patch('/todo/{todo_id}/mark/completed', [TodosController::class, 'markCompleted']);