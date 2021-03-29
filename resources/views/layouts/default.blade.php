<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
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
    <script src="{{ mix('js/app.js') }}"></script>
    @include('partials.error')
    @include('partials.flash')
    @stack('scripts')
</body>
</html>