@extends('theme.panel')

@section('title')
داشبورد
@endsection

@section('page-content')
    <h1>Hello {{ auth()->user()->name }}!</h1>
@endsection