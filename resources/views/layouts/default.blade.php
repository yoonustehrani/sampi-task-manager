<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="apple-touch-icon" href="{{ asset('favicon.png') }}">
    <meta name="theme-color" content="#2C303B">
    @yield('head')
</head>
<body>
    @yield('content')
    <script>
        var APP_PATH = "{{ asset('/') }}";
        const USER_ROUTE = "{{ route('task-manager.users.show', ['user' => 'userId']) }}",
        TASK_ROUTE = "{{ route('task-manager.tasks.show', ['task' => 'taskId']) }}",
        WORKSPACE_ROUTE = "{{ route('task-manager.workspaces.show', ['workspace' => 'workspaceId']) }}",
        DEMAND_ROUTE = "{{ route('task-manager.demands.show', ['workspace' => 'workspaceId', 'demand' => 'demandId']) }}",
        PRIORITY_ROUTE = "{{ route('api.task-manager.priorities.index') }}";
        @auth
        const CurrentUser = {!! json_encode(auth()->user()->only(['id', 'fullname', 'avatar_pic'])) !!};
        @endauth
    </script>

    @if (config('app.env') == 'local')
    <script src="{{ asset('js/app.js') }}"></script>
    @else
    <script src="{{ asset(mix('js/app.js')) }}"></script>
    @endif
    
    @include('partials.error')
    @include('partials.flash')
    @stack('scripts')
</body>
</html>