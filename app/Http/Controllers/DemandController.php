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
        $demand = $workspace->demands()
        ->with(['from', 'to', 'priority', 'messages' => function($q) {
            $q->latest()->limit(1);
        }])
        ->withCount('messages')
        ->findOrFail($demand);
        $this->authorize('view', $demand);
        return view('theme.pages.demands.show', compact('demand', 'workspace'));
    }

    public function destroy(Request $request, $workspace, Demand $demand)
    {
        $this->authorize('delete', $demand);
        $targetId = $demand->workspace_id;
        $demand->delete();
        return redirect()->to(route('task-manager.demands.index', ['workspace' => $targetId]));
    }
}
