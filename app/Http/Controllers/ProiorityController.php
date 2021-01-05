<?php

namespace App\Http\Controllers;

use App\Priority;
use Illuminate\Http\Request;

class ProiorityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $proiorities = Priority::all();
        return view('theme.pages.proiorities.index', compact('proiorities'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('theme.pages.proiorities.create');
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
     * @param  int  $proiority
     * @return \Illuminate\Http\Response
     */
    public function show($proiority)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $proiority
     * @return \Illuminate\Http\Response
     */
    public function edit($proiority)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $proiority
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $proiority)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $proiority
     * @return \Illuminate\Http\Response
     */
    public function destroy($proiority)
    {
        //
    }
}
