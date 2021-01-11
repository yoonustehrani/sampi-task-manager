@extends('theme.panel')

@section('title')
داشبورد
@endsection

@section('page-content')
    <div 
        id="react-dashboard"
        mixed_tasks="{{ route('api.task-manager.tasks.mixed', ['api_token' => auth()->user()->api_token]) }}"
        workspace_route="{{ route('task-manager.workspaces.show', ['workspace' => 'workspaceId']) }}"
        task_route="{{ route('task-manager.tasks.show', ['task' => 'taskId']) }}"
        workspace_counter = "{{ route('api.task-manager.counter.workspaces', ['api_token' => auth()->user()->api_token]) }}"
        task_counter = "{{ route('api.task-manager.counter.tasks', ['api_token' => auth()->user()->api_token]) }}"
        demand_counter = "{{ route('api.task-manager.counter.demands', ['api_token' => auth()->user()->api_token]) }}"
    ></div>
@endsection

@push('scripts')
    <script>
        var APP_PATH = "{{ asset('/') }}";
    </script>
    <script src="{{ asset('/js/dashboard.js') }}"></script>
@endpush