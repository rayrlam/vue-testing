<?php

use App\Http\Controllers\TodosController;
use App\Http\Controllers\SubTaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/todos', [TodosController::class,'index'])->name('todo.index');
Route::post('/todo', [TodosController::class,'store'])->name('todo.store');
Route::patch('/todo/{todo}', [TodosController::class, 'update'])->name('todo.update');
Route::patch('/todo/{todo_id}/mark/completed', [TodosController::class, 'markCompleted'])->name('todo.completed');
Route::patch('/todo/{todo_id}/mark/uncomplete', [TodosController::class, 'markUncomplete'])->name('todo.uncomplete');
Route::delete('/todo/{todo}', [TodosController::class,'archive'])->name('todo.archive');

Route::post('/todo/{todo}/subtask', [SubTaskController::class,'store'])->name('subtask.store');