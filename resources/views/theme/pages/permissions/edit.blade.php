@extends('theme.panel')

@section('title')
ویرایش مجوز ({{ $permission->key }})
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => "ویرایش مجوز شماره #{$permission->id}"])@endcomponent
    <form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.permissions.update', ['permission' => $permission->id]) }}" method="post">
        @csrf
        @method('PUT')
        <div class="col-lg-4 col-md-6 col-12 input-group float-right">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-tag"></i></span>
            </div>
            <input type="text" value="{{ old('label') ?: $permission->label }}" name="label" id="label" class="form-control" placeholder="{{ __('label') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input type="text" value="{{ old('key')   ?: $permission->key }}" name="key" id="key" class="form-control" placeholder="{{ __('key') }}">
        </div>
        <div class="col-12 p-3 float-right text-right">
            <button type="submit" class="btn btn-outline-primary">{{ __('save') }}</button>
        </div>
    </form>
@endsection