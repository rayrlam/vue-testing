<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/todo', function(){
    return response()->json([
        'title' => 'My First TODO'
    ]);
});