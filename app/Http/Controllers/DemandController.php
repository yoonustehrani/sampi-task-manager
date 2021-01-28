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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function mixed(Request $request)
    {
        return view('theme.pages.demands.mixed');
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
}
