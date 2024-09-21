<?php

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::post('/todo', function(Request $request){

    $todo = Todo::create([
        'title' => $request->title
    ]);

    return $todo;
});