<?php

namespace App\Http\Controllers;

use App\Demand;
use Illuminate\Http\Request;

class DemandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('theme.pages.demands.index');
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
    public function show($demand)
    {
        $demand = Demand::with('from', 'to', 'workspace', 'priority', 'task')->withCount('messages')->findOrFail($demand);
        return view('theme.pages.demands.show', compact('demand'));
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
