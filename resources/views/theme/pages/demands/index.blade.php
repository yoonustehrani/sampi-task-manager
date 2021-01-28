@extends('theme.panel')

@section('title')
درخواست ها
@endsection

@section('page-content')
    <div 
        id="demands-react"
        data-index="{{ route('api.task-manager.demands.index', ['workspace' => $workspace->id]) }}"
        {{-- relationship=asked -> from sb else to the current user --}}
        data-store="{{ route('api.task-manager.demands.store', ['workspace' => $workspace->id]) }}"
    >
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/demands.js') }}"></script>
@endpush