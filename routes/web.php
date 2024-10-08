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
Route::patch('/todo/{todo}/mark/{progress}', [TodosController::class, 'progress'])->name('todo.progress.update');
Route::delete('/todo/{todo}', [TodosController::class,'archive'])->name('todo.archive');

Route::post('/subtask/{type}/{type_id}', [SubTaskController::class,'store'])->name('subtask.store');