@extends('layouts.default')

@section('head')
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <title>@yield('title')| {{ config('app.name') }}</title>
    <style>
        table {
            direction: rtl;
            text-align: center;
        }
        form {
            direction: rtl;
        }
        .d-ltr {
            direction: ltr;
        }
        .d-rtl {
            direction: rtl;
        }
    </style>
@endsection

@section('content')
    <div class="col-12 admin-area p-0 m-0 h-12">
        <div class="col-lg-2 col-md-3 d-md-block h-12 p-0" id="right-menu">
            <div class="top-section col-12 text-center float-left">
                <button class="btn btn-secondary d-md-none float-right collapser-btn">
                    <i class="fas fa-angle-double-right"></i>
                </button>
                <img class="logo-top" src="{{ asset('images/logo/sampi.png') }}" alt="sampi-tech-group">
                <p class="col-12 m-0 mt-1 p-0 float-right text-center">Task Manager</p>
            </div>
            @include('theme.tools.menu')
        </div>
        <div class="col-lg-10 col-md-9 col-12 h-12" id="mainpage">
            @include('theme.tools.top-navbar')
            <div class="col-12 p-3 contentbar float-left">
                @yield('page-content')
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @yield('scripts')
@endpush
