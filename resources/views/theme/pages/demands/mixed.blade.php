@extends('theme.panel')

@section('title')
همه درخواست ها
@endsection

@section('page-content')
    <div 
        id="mixed-demands-react"
        data-index="{{ route('api.task-manager.demands.mixed', ['api_token' => auth()->user()->api_token]) }}"
        {{-- relationship=asked -> from sb else to the current user --}}
        data-store="{{ route('api.task-manager.demands.store', ['workspace' => 'workspaceId', 'api_token' => auth()->user()->api_token]) }}"
        data-show="{{ route('api.task-manager.demands.show', ['workspace' => 'workspaceId', 'demand' => 'demandId']) }}"
        data-destroy="{{ route('api.task-manager.demands.destroy', ['workspace' => 'workspaceId', 'demand' => 'demandId']) }}"
        logged-in-user-id = "{{ auth()->user()->id }}"
        data-search="{{ route('api.task-manager.demands.search', ['api_token' => auth()->user()->api_token]) }}"
        workspaces-api="{{ route('api.task-manager.workspaces.index', ['api_token' => auth()->user()->api_token]) }}"
        get-all-users="{{ route('api.task-manager.users.index', ['api_token' => auth()->user()->api_token]) }}"
    >
    </div>
@endsection

@push('scripts')
    <script>
        const CAN_VIEW_AS_ADMIN = {{ \Gate::allows('viewAny', \App\Demand::class) ? 'true' : 'false' }};
        var VIEW_AS_ADMIN       = {{ request()->view_as_admin == 'true' ? 'true' : 'false' }}; 
        var simple_search_url = "{{ route('api.task-manager.tasks.search.simple', ['api_token' => auth()->user()->api_token]) }}"
    </script>
    <script src="{{ mix('js/mixedDemands.js') }}"></script>
    <script src="{{ mix('js/select2.js') }}"></script>
@endpush