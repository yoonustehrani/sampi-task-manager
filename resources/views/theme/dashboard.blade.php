@extends('theme.panel')

@section('title')
داشبورد
@endsection

@section('page-content')
    <div 
        id = "react-dashboard"
        workspace_route = "{{ route('task-manager.workspaces.show', ['workspace' => 'workspaceId']) }}"
        task_route = "{{ route('task-manager.tasks.show', ['task' => 'taskId']) }}"
        workspace_counter = "{{ route('api.task-manager.counter.workspaces', ['api_token' => auth()->user()->api_token]) }}"
        task_counter = "{{ route('api.task-manager.counter.tasks', ['api_token' => auth()->user()->api_token]) }}"
        demand_counter = "{{ route('api.task-manager.counter.demands', ['api_token' => auth()->user()->api_token]) }}"
        workspaces = "{{ route('api.task-manager.workspaces.index', ['api_token' => auth()->user()->api_token]) }}"
        mixed_tasks = "{{ route('api.task-manager.tasks.mixed', ['api_token' => auth()->user()->api_token]) }}"
        mixed_demands = "{{ route('api.task-manager.demands.mixed', ['api_token' => auth()->user()->api_token]) }}"
        demand-show-route="{{ route('task-manager.demands.show', ['workspace' => 'workspaceId', 'demand' => 'demandId']) }}"
        user-profile-route="{{ route('task-manager.users.show', ['user' => 'userId']) }}"
        toggle-task-state-api = "{{ route('api.task-manager.tasks.toggle_state', ['workspace' => "workspaceId", 'task' => 'taskId', 'api_token' => auth()->user()->api_token]) }}"
    ></div>
@endsection

@push('scripts')
    @if (config('app.env') == 'local')
    <script src="{{ asset('/js/dashboard.js') }}"></script>
    @else
    <script src="{{ asset(mix('/js/dashboard.js')) }}"></script>
    @endif
@endpush