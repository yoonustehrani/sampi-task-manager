@extends('theme.panel')

@section('title')

@endsection

@section('page-content')
<div
    id = "react-show-task"
    task_api = "{{ route('api.task-manager.tasks.show', ['workspace' => $task->workspace->id, 'task' => $task->id, 'api_token' => auth()->user()->api_token]) }}"
></div>
@endsection

@section('scripts')
    <script src="{{ asset("/js/task.js") }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
@endsection