@extends('theme.panel')

@section('title')
افزودن مجوز
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => 'ایجاد مجوز جدید'])@endcomponent
    <form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.permissions.store') }}" method="post">
        @csrf
        <div class="col-lg-4 col-md-6 col-12 input-group float-right">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-tag"></i></span>
            </div>
            <input type="text" value="{{ old('label') }}" name="label" id="label" class="form-control" placeholder="{{ __('label') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input type="text" value="{{ old('key') }}" name="key" id="key" class="form-control" placeholder="{{ __('key') }}">
        </div>
        <div class="col-12 p-3 float-right text-right">
            <button type="submit" class="btn btn-outline-primary">{{ __('save') }}</button>
        </div>
    </form>
@endsection