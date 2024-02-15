<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Todo',[
            'todos' => Todo::latest() -> get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'entry' => 'required|string|max:255',
        ]);

        // create a new entry in the todo list app
        $entry = new Todo();
        $entry -> entry = $request -> input('entry');

        $entry -> save();

        return redirect() -> route('todos.index');
    }
}
