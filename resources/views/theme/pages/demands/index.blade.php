@extends('theme.panel')

@section('title')
درخواست ها در پروژه ({{ $workspace->title }})
@endsection

@section('page-content')
    <div 
        id="demands-react"
        data-index="{{ route('api.task-manager.demands.index', ['workspace' => $workspace->id, 'api_token' => auth()->user()->api_token]) }}"
        {{-- relationship=asked -> from sb else to the current user --}}
        data-store="{{ route('api.task-manager.demands.store', ['workspace' => $workspace->id, 'api_token' => auth()->user()->api_token]) }}"
        data-show="{{ route('api.task-manager.demands.show', ['workspace' => $workspace->id, 'demand' => 'demandId']) }}"
        data-destroy="{{ route('api.task-manager.demands.destroy', ['workspace' => $workspace->id, 'demand' => 'demandId']) }}"
        user-profile-route="{{ route('task-manager.users.show', ['user' => 'userId']) }}"
        task-route="{{ route('task-manager.tasks.show', ['task' => 'taskId']) }}"
        workspace-api = "{{ route('api.task-manager.workspaces.show', ['workspace' => $workspace->id, 'api_token' => auth()->user()->api_token]) }}"
        logged-in-user-id = "{{ auth()->user()->id }}"
        demand-route="{{ route('task-manager.demands.show', ['workspace' => $workspace->id, 'demand' => 'demandId']) }}"
    >
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/demands.js') }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
    <script>
        const CAN_VIEW_AS_ADMIN = {{ \Gate::allows('update', $workspace) ? 'true' : 'false' }};
        var VIEW_AS_ADMIN       = {{ request()->view_as_admin == 'true' ? 'true' : 'false' }}; 
    </script>
@endpush