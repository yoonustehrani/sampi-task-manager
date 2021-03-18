@extends('theme.panel')

@section('title')
حساب کاربری {{ auth()->user()->id == $user->id ? 'من' : $user->fullname }}
@endsection

@section('page-content')
    <div
        id = "user-profile-react"
        workspaces = "{{ route('api.task-manager.workspaces.index', ['api_token' => auth()->user()->api_token]) }}"
        data-mixed-tasks = "{{ route('api.task-manager.tasks.mixed', ['api_token' => auth()->user()->api_token]) }}"
        data-mixed-demands = "{{ route('api.task-manager.demands.mixed', ['api_token' => auth()->user()->api_token]) }}"
        data-chart-completed="{{ route('api.task-manager.chart.tasks', ['type' => 'completed', 'api_token' => auth()->user()->api_token]) }}"
        data-chart-ontime="{{ route('api.task-manager.chart.tasks', ['type' => 'ontime', 'api_token' => auth()->user()->api_token]) }}"
        data-chart-yearly="{{ route('api.task-manager.chart.tasks', ['type' => 'yearly', 'api_token' => auth()->user()->api_token]) }}"
        task-counter = "{{ route('api.task-manager.counter.tasks', ['api_token' => auth()->user()->api_token]) }}"
    ></div>
@endsection

@push('scripts')
    <script>
        const TargetUser = {!! json_encode($user->only(['id', 'fullname', 'avatar_pic', 'name', 'roles'])) !!};
    </script>
    <script src="{{ asset("js/user-profile.js") }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
    <script src="{{ asset('js/chart.js') }}"></script>
@endpush