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

    public function update(Request $request)
    {
        $id = $request -> input('id');
        $entry = Todo::findOrFail($id);

        $entry -> update ([
            'entry' => $request -> input('entry')
        ]);

        return redirect() -> route('todos.index') -> with('success', 'The todo is updated successfully');
    }

    public function destroy(Request $request) 
    {
        $id = $request -> query('id');
        $entry = Todo::findOrFail($id);
        $entry -> delete();

        return redirect() -> route('todos.index') -> with('success', 'The todo is deleted successfully');
    }
}
