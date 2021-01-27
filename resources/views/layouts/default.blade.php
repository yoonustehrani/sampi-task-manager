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
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
    @include('partials.error')
    @stack('scripts')
</body>
</html>