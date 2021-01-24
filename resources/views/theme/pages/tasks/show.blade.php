@extends('theme.panel')

@section('title')

@endsection

@section('page-content')
<div
    id = "react-show-task"
    task_api = "{{ route('api.task-manager.tasks.show', ['workspace' => $task->workspace->id, 'task' => $task->id, 'api_token' => auth()->user()->api_token]) }}"
    workspace_api = "{{ route('api.task-manager.workspaces.show', ['workspace' => $task->workspace->id, 'api_token' => auth()->user()->api_token]) }}"
    logged_in_user_id = "{{ auth()->user()->id }}"
></div>
@endsection

@push('scripts')
    <script src="{{ asset("/js/task.js") }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
@endpush