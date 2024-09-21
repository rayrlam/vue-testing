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
}
