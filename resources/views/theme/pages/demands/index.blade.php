@extends('theme.panel')

@section('title')
درخواست ها
@endsection

@section('page-content')
    <div 
        id="demands-react"
    >
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/demands.js') }}"></script>
@endpush