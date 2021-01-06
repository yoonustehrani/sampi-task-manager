<?php

namespace App\Http\Controllers;

use App\User;
use App\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $workspaces = Workspace::withCount(['tasks', 'finished_tasks', 'demands_left', 'users'])->paginate(5);
        return view('theme.pages.workspaces.index', compact('workspaces'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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
        $workspace = new Workspace();
        $workspace->title = $request->title;
        $workspace->description = $request->description;
        $workspace->avatar_pic = $request->avatar_pic;
        $workspace->save();
        $workspace->admins()->attach([auth()->user()->id]);
        $workspace->members()->attach($request->input('members'));
        return redirect()->to(route('task-manager.workspaces.index'));
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
        ])->withCount(['tasks', 'demands'])->findOrFail($workspace);
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
        $users = User::all();
        $workspace = Workspace::with(['admins', 'members'])->findOrFail($workspace);
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
        $workspace->title = $request->title;
        $workspace->description = $request->description;
        $workspace->avatar_pic = $request->avatar_pic;
        $members = $request->input('members') ?: [];
        $members = collect($members)->diff($request->input('admins'));
        $workspace->save();
        $workspace->admins()->sync($request->input('admins'));
        $workspace->members()->sync($members);
        return redirect()->to(route('task-manager.workspaces.edit', ['workspace' => $workspace->id]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $workspace
     * @return \Illuminate\Http\Response
     */
    public function destroy($workspace)
    {
        Workspace::findOrFail($workspace)->delete();
    }
}
