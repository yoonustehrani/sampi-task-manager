@extends('theme.panel')

@section('title')
وظایف من
@endsection

@section('page-content')
    <div
        id="mixed-tasks-react"
        get-mixed-tasks-api="{{ route('api.task-manager.tasks.mixed', ['api_token' => auth()->user()->api_token]) }}"
    >
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/mixedTasks.js') }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
@endpush