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
    ></div>
@endsection

@push('scripts')
    <script src="{{ asset('/js/dashboard.js') }}"></script>
@endpush