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
    >
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/demands.js') }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
@endpush