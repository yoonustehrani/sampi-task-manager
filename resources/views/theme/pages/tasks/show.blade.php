@extends('theme.panel')

@section('title')
({{ $task->title }})
@endsection

@section('page-content')
<div
    id = "react-show-task"
    task_api = "{{ route('api.task-manager.tasks.show', ['workspace' => $task->workspace->id, 'task' => $task->id, 'api_token' => auth()->user()->api_token]) }}"
    workspace_api = "{{ route('api.task-manager.workspaces.show', ['workspace' => $task->workspace->id, 'api_token' => auth()->user()->api_token]) }}"
    logged_in_user_id = "{{ auth()->user()->id }}"
    edit_task_api = "{{ route('api.task-manager.tasks.update', ['workspace' => $task->workspace->id, 'task' => $task->id, 'api_token' => auth()->user()->api_token]) }}"
    toggle_task_state_api = "{{ route('api.task-manager.tasks.toggle_state', ['workspace' => $task->workspace->id, 'task' => $task->id, 'api_token' => auth()->user()->api_token]) }}"
    destroy-task = "{{ route('api.task-manager.tasks.destroy', ['task' => $task->id, 'workspace' => $task->workspace->id, 'api_token' => auth()->user()->api_token]) }}"
    ></div>
@endsection

@push('scripts')
    <script>
        var simple_search_url = "{{ route('api.task-manager.tasks.search.simple', ['api_token' => auth()->user()->api_token]) }}"
    </script>
    @if (config('app.env') == 'local')
    <script src="{{ asset('js/datepicker.js') }}"></script>
    <script src="{{ asset("/js/task.js") }}"></script>
    <script src="{{ asset('js/select2.js'))}}"></script> 
    @else
    <script src="{{ asset(mix('js/datepicker.js')) }}"></script>
    <script src="{{ asset(mix("/js/task.js")) }}"></script>
    <script src="{{ asset(mix('js/select2.js')) }}"></script> 
    @endif
@endpush