<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sampi Tech Group</title>
    
    @if (config('app.env') == 'local')
        
    @else
        
    @endif

    @if (config('app.env') == 'local')
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/welcome.css') }}">
    @else
    <link rel="stylesheet" href="{{ asset(mix('css/app.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/welcome.css')) }}">
    @endif
    
</head>
<body>
    <div class="col-12 h-100 float-left main-division">
        <div class="col-md-6 col-12 float-left mb-md-0 mb-3 p-3 left-section">
            <div class="logo-section">
                <img src="{{ asset('images/logo/sampi.png') }}" alt="">
                <p class="m-0">Sampi Tech Group</p>
            </div>
        </div>
        <div class="col-md-6 col-12 float-left mb-md-0 mb-3 p-3 right-section rtl">
            <p class="col-12 float-left text-center"><i class="fas fa-list"></i> ماژول ها</p>
            <div class="float-left module-section">
                <ul class="col-md-6 col-12 p-0 module-list float-right">
                    <li><a href="{{ route('task-manager.') }}"><i class="fas fa-briefcase"></i> مدیریت یکپارچه پروژه ها</a></li>
                </ul>
                <ul class="col-md-6 col-12 p-0 module-list float-right">
                    {{-- <li><a href="{{ route('task-manager.') }}">سیستم یکپارچه مدیریت پروژه</a></li> --}}
                </ul>
            </div>
        </div>
    </div>
</body>
</html>

