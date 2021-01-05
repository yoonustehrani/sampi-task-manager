@extends('theme.panel')

@section('page-content')
    <h1>Hello {{ auth()->user()->name }}!</h1>
@endsection