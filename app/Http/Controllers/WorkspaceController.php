<?php

namespace App\Http\Controllers;

use App\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $workspaces = Workspace::withCount(['tasks', 'demands', 'admins'])->all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $request;
        $workspace = new Workspace();
        $workspace->title = $request->title;
        $workspace->description = $request->description;
        // $things = collect([]);
        // $things->diff();
        $workspace->admins()->attach($request->input('admins'));
        $workspace->members()->attach($request->input('members'));
        $workspace->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $workspace
     * @return \Illuminate\Http\Response
     */
    public function show($workspace)
    {
        $workspace = Workspace::with(['users', 'tasks', 'demands'])->findOrFail($workspace);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $workspace
     * @return \Illuminate\Http\Response
     */
    public function edit($workspace)
    {
        $workspace = Workspace::findOrFail($workspace);
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
        $workspace->admins()->sync($request->input('admins'));
        $workspace->members()->sync($request->input('members'));
        $workspace->save();
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
