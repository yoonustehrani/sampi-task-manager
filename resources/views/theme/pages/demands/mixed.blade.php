@extends('theme.panel')

@section('title')
همه درخواست ها
@endsection

@section('page-content')
    <div 
        id="demands-react"
        data-index="{{ route('api.task-manager.demands.mixed') }}"
        {{-- relationship=asked -> from sb else to the current user --}}
        data-store="{{ route('api.task-manager.demands.store', ['workspace' => 'workspaceId']) }}"
        data-show="{{ route('api.task-manager.demands.show', ['workspace' => 'workspaceId', 'demand' => 'demandId']) }}"
        data-destroy="{{ route('api.task-manager.demands.destroy', ['workspace' => 'workspaceId', 'demand' => 'demandId']) }}"
    >
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/demands.js') }}"></script>
@endpush