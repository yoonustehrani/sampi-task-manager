@extends('theme.panel')

@section('title')
افزودن اولویت
@endsection

@section('page-content')
@component('theme.tools.title', ['title' => 'افزودن اولویت'])@endcomponent
<form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.priorities.store') }}" method="post">
    @csrf
    <div class="col-lg-4 col-md-6 col-12 input-group float-right">
        <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-tag"></i></span>
        </div>
        <input required type="text" value="{{ old('title') }}" name="title" id="title" class="form-control" placeholder="{{ __('title') }}">
    </div>
    <div class="col-lg-4 col-md-6 col-12 input-group float-right">
        <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-font"></i></span>
        </div>
        <input type="text" value="{{ old('icon_class') }}" name="icon_class" id="icon_class" class="form-control" placeholder="{{ __('icon') }}">
    </div>
    <div class="col-lg-4 col-md-6 col-12 input-group float-right">
        <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-tag"></i></span>
        </div>
        <input type="text" value="{{ old('color_class') }}" name="color_class" id="color_class" class="form-control" placeholder="{{ __('color') }}">
    </div>
    <div class="col-12 p-3 float-right text-right">
        <button type="submit" class="btn btn-outline-primary">{{ __('save') }}</button>
    </div>
</form>
@endsection