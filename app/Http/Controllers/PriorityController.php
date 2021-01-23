<?php

namespace App\Http\Controllers;

use App\Priority;
use Illuminate\Http\Request;

class PriorityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Priority::class);
        $priorities = Priority::all();
        return view('theme.pages.priorities.index', compact('priorities'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Priority::class);
        return view('theme.pages.priorities.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Priority::class);
        $request->validate([
            'title' => 'required|string|min:3|max:255|unique:priorities,title',
            'icon_class' => 'nullable|string',
            'color_class' => 'nullable|string'
        ]);
        $priority = new Priority();
        $priority->title = $request->title;
        $priority->icon_class = $request->icon_class;
        $priority->color_class = $request->color_class;
        $priority->save();
        return redirect()->to(route('task-manager.priorities.index'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $priority
     * @return \Illuminate\Http\Response
     */
    public function edit(Priority $priority)
    {
        $this->authorize('update', $priority);
        return view('theme.pages.priorities.edit', compact('priority'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $priority
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Priority $priority)
    {
        $this->authorize('update', $priority);
        $request->validate([
            'title' => 'required|string|min:3|max:255|unique:priorities,title,' . $priority->id,
            'icon_class' => 'nullable|string',
            'color_class' => 'nullable|string'
        ]);
        $priority->title = $request->title;
        $priority->icon_class = $request->icon_class;
        $priority->color_class = $request->color_class;
        $priority->save();
        return redirect()->to(route('task-manager.priorities.edit', compact('priority')));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $priority
     * @return \Illuminate\Http\Response
     */
    public function destroy(Priority $priority)
    {
        $this->authorize('delete', $priority);
        $priority->delete();
        return redirect()->to(route('task-manager.priorities.index'));
    }
}
