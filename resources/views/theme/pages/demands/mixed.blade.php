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
        {{-- data-search="{{ route('api.task-manager.demands.mixed.search', ['api_token' => auth()->user()->api_token]) }}" --}}
    >
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/mixedDemands.js') }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
@endpush