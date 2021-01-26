<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <form action="/" method="POST" class="col-12 float-left p-3">
        @csrf
        <input type="hidden" name="due_to">
        <input type="text" id="example">
        <button type="submit">Submit</button>
    </form>
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/datepicker.js') }}"></script>
</body>
</html>

