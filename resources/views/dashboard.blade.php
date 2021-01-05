@extends('layouts.default')

@section('head')
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
@endsection

@section('content')
    <div class="col-12 admin-area p-0 m-0 h-12">
        <div class="col-lg-2 col-md-3 d-md-block d-none h-12 p-0" id="right-menu">
            <div class="top-section col-12 text-center float-left">
                <img class="logo-top" src="{{ asset('images/logo/sampi.png') }}" alt="sampi-tech-group">
                <p class="col-12 m-0 mt-1 p-0 float-right text-center">Task Manager</p>
            </div>
            <nav>
                <ul class="horizental-menu col-12">
                    <li>
                        <a href="">امورات<i class="fas fa-tasks"></i></a>
                    </li>
                    <li class="has_sub">
                        <p>
                            <a href="#demands">
                                نیاز ها<i class="fab fa-stack-exchange"></i>
                            </a>
                            <i class="opener fa fa-angle-left"></i>
                        </p>
                        <ul>
                            <li class="sub"><a href="">ضروری و مهم<i class="fas fa-hourglass-end"></i></a></li>
                            <li class="sub"><a href="">ضروری و غیر مهم<i class="fas fa-hourglass-half"></i></a></li>
                            <li class="sub"><a href="">غیر ضروری و مهم<i class="fas fa-hourglass-start"></i></a></li>
                            <li class="sub"><a href="">غیر ضروری و غیر مهم<i class="fas fa-hourglass"></i></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="" id="toggle-logout">
                        <i class="fas fa-sign-out-alt"></i> خروج
                        </a>
                    </li>
                    <form class="d-none" id="logout-form" action="{{ route('logout') }}" method="POST">@csrf</form>
                </ul>
            </nav>
        </div>
        <div class="col-lg-10 col-md-9 col-12 h-12" id="mainpage">
            <div class="col-12 navbar-top">
                <div class="admin-info-container float-left">
                    <a href="#" class="float-left mr-2"><img src="/images/amir.jpg" alt="profile photo"></a>
                    <div>
                        <p class="admin-email-link">amirreza.mansoorian2003@gmail.com</p>
                        <div class="btn-group drop-down-container">
                            <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-user-tie"></i> Amir
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">تنظیمات <i class="fas fa-cog"></i></a>
                                <a class="dropdown-item" href="#">خروج <i class="fas fa-sign-out-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <button data-event="max" class="btn scr-controller float-right">
                    <i class="fas fa-expand-arrows-alt fa-compress"></i>
                </button>
                <button id="collapser" class="btn btn-secondary float-right">
                    <i class="fas fa-angle-double-left"></i>
                </button>
            </div>
            <div class="col-12 contentbar float-left">
                @yield('pagecontent')
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/app.js') }}"></script>
@endpush