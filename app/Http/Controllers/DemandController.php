<?php

namespace App\Http\Controllers;

use App\Demand;
use App\Workspace;
use Illuminate\Http\Request;

class DemandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Workspace $workspace)
    {
        return view('theme.pages.demands.index', compact('workspace'));
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $demand
     * @return \Illuminate\Http\Response
     */
    public function show(Workspace $workspace, $demand)
    {
        $demand = $workspace->demands()->with('from', 'to', 'priority')->withCount('messages')->findOrFail($demand);
        return view('theme.pages.demands.show', compact('demand', 'workspace'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $demand
     * @return \Illuminate\Http\Response
     */
    public function edit($demand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $demand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $demand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $demand
     * @return \Illuminate\Http\Response
     */
    public function destroy($demand)
    {
        //
    }
}
