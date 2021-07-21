<?php

namespace App\Http\Controllers;

use App\Events\WorkspaceCreated;
use App\User;
use App\Workspace;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class WorkspaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (\Gate::allows('viewAny', Workspace::class)) {
            $workspaces = Workspace::withCount(['tasks', 'finished_tasks', 'demands_left'])->with('users')->paginate(5);
        } else {
            $workspaces = auth()->user()->workspaces()->withCount(['tasks', 'finished_tasks', 'demands_left'])->with('users')->paginate(5);
        }
        return view('theme.pages.workspaces.index', compact('workspaces'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Workspace::class);
        $users = User::where('id', '!=', auth()->user()->id)->get();
        return view('theme.pages.workspaces.create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Workspace::class);
        $request->validate([
            'title' => [
                'required',
                'min:3',
                'max:60',
                Rule::unique('workspaces', 'title')->whereNull('deleted_at')
            ],
            'description' => 'required|string',
            'avatar_pic' => 'nullable|string'
        ]);  
        $workspace = new Workspace();
        $workspace->title = $request->title;
        $workspace->description = $request->description;
        $workspace->avatar_pic = $request->avatar_pic;
        $workspace->save();
        $workspace->admins()->attach([auth()->user()->id]);
        $workspace->members()->attach($request->input('members'));
        dispatch(function () use($workspace) {
            event(new WorkspaceCreated($workspace));
        })->afterResponse();
        flash()->success("پروژه {$workspace->title} با موفقیت ساخته شده");
        return response()->redirectTo(route('task-manager.workspaces.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $workspace
     * @return \Illuminate\Http\Response
     */
    public function show($workspace)
    {
        $workspace = Workspace::with([
            'users' => function($q) use($workspace) {
                $q->withCount([
                    'tasks'   => function($q) use($workspace) {$q->where('workspace_id', $workspace);},
                    'demands' => function($q) use($workspace) {$q->where('workspace_id', $workspace);},
                    'asked_demands' => function($q) use($workspace) {$q->where('workspace_id', $workspace);}
                ])->with('roles');
            }
        ])->withCount(['tasks', 'demands', 'finished_tasks', 'demands_left'])->findOrFail($workspace);
        $this->authorize('view', $workspace);
        return view('theme.pages.workspaces.show', compact('workspace'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $workspace
     * @return \Illuminate\Http\Response
     */
    public function edit($workspace)
    {
        $workspace = Workspace::with(['admins', 'members'])->findOrFail($workspace);
        $this->authorize('update', $workspace);
        $users = User::where('id', '!=', auth()->user()->id)->get();
        return view('theme.pages.workspaces.edit', compact('workspace', 'users'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $workspace
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $workspace)
    {
        $workspace = Workspace::findOrFail($workspace);
        $this->authorize('update', $workspace);
        $request->validate([
            'title' => [
                'required',
                'min:3',
                'max:60',
                Rule::unique('workspaces', 'title')->ignore($workspace->id)->whereNull('deleted_at')
            ],
            'description' => 'required|string',
            'avatar_pic' => 'nullable|string'
        ]); 
        $workspace->title = $request->title;
        $workspace->description = $request->description;
        $workspace->avatar_pic = $request->avatar_pic;
        $members = $request->input('members') ?: [];
        $members = collect($members)->diff($request->input('admins'));
        $workspace->save();
        $admins = $request->input('admins') ? array_merge([auth()->user()->id], $request->input('admins')) : [auth()->user()->id];
        $workspace->admins()->sync($admins);
        $workspace->members()->sync($members);
        flash()->success("پروژه {$workspace->title} با موفقیت بروزرسانی شده");
        return redirect()->to(route('task-manager.workspaces.edit', ['workspace' => $workspace->id]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $workspace
     * @return \Illuminate\Http\Response
     */
    public function destroy(Workspace $workspace)
    {
        $this->authorize('delete', $workspace);
        $workspace->delete();
        return redirect()->to(route('task-manager.workspaces.index'));
    }
}
