@extends('layouts.default')

@section('head')
<link rel="stylesheet" href="{{ asset('css/auth.css') }}">
<style>
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
  transition: background-color 5000s;
  -webkit-text-fill-color: #fff !important;
}
</style>
@endsection

@section('content')
<div class="container col-12">
    <div class="card col-lg-4 col-md-6 col-sm-10 offset-lg-4 offset-md-3 offset-sm-1 text-center">
        <!-- <div class="avatar-container mb-4">
            <img src="{{ asset('/images/user-avatar.png') }}" alt=""></img>
        </div> -->
        <div class="avatar-container mb-4">
            <img src="{{ asset('/images/logo/sampi.png') }}" alt=""></img>
        </div>
        <form action="{{ route('login') }}" method="post" autocomplete="off">
            @csrf
            <input autocomplete="false" name="hidden" type="text" class="hidden">
            <div class="form-group input-group mb-4">
                <div class="input-group-prepend">
                    <i class="fas fa-user-tie input-icon"></i>
                </div>
                <input type="email" name="email" class="auth-input form-control text-center" placeholder="Email Address" autocomplete="off">
            </div>
            <div class="form-group input-group mb-4">
                <div class="input-group-prepend">
                    <i class="fas fa-key input-icon"></i>
                </div>
                <input type="password" name="password" class="auth-input form-control text-center" placeholder="Password" autocomplete="off">
            </div>
            <button class="btn btn-outline-light text-center" type="submit">Login</button>
        </form>
    </div>
</div>
@endsection
