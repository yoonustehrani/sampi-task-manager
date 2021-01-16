@extends('theme.panel')

@section('title')

@endsection

@section('page-content')
<p>Example : </p>
<p>{{ route('api.task-manager.tasks.show', ['workspace' => $task->workspace->id, 'task' => $task->id, 'api_token' => auth()->user()->api_token]) }}</p>
@endsection