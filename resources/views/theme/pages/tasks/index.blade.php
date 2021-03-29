@extends('theme.panel')

@section('title')
وظایف من
@endsection

@section('page-content')
    <div
        id="mixed-tasks-react"
        get-mixed-tasks-api="{{ route('api.task-manager.tasks.mixed', ['api_token' => auth()->user()->api_token]) }}"
        data-search="{{ route('api.task-manager.tasks.search', ['api_token' => auth()->user()->api_token]) }}"
        simple-search="{{ route('api.task-manager.tasks.search.simple', ['api_token' => auth()->user()->api_token]) }}"
        workspaces-api="{{ route('api.task-manager.workspaces.index', ['api_token' => auth()->user()->api_token]) }}"
        add_task_api = "{{ route('api.task-manager.tasks.store', ['workspace' => "workspaceId", 'api_token' => auth()->user()->api_token]) }}"
        logged-in-user-id = "{{ auth()->user()->id }}"
        get-all-users="{{ route('api.task-manager.users.index', ['api_token' => auth()->user()->api_token]) }}"
        toggle-task-state-api = "{{ route('api.task-manager.tasks.toggle_state', ['workspace' => "workspaceId", 'task' => 'taskId', 'api_token' => auth()->user()->api_token]) }}"
    >
    </div>
@endsection

@push('scripts')
    <script>
        const CAN_VIEW_AS_ADMIN = {{ \Gate::allows('viewAny', \App\Task::class) ? 'true' : 'false' }};
        var VIEW_AS_ADMIN       = {{ request()->view_as_admin == 'true' ? 'true' : 'false' }}; 
        var simple_search_url = "{{ route('api.task-manager.tasks.search.simple', ['api_token' => auth()->user()->api_token]) }}"
    </script>
    <script src="{{ asset(mix('js/datepicker.js')) }}"></script>
    <script src="{{ asset(mix('js/mixedTasks.js')) }}"></script>
    <script src="{{ asset(mix('js/select2.js')) }}"></script>
@endpush