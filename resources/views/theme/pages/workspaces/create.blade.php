@extends('theme.panel')

@section('title')
افزودن پروژه
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => 'ایجاد پروژه جدید'])@endcomponent
    <form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.workspaces.store') }}" method="post">
        @csrf
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input required type="text" value="{{ old('title') }}" name="title" id="title" class="form-control" placeholder="{{ __('title') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-image"></i></span>
            </div>
            <input type="text" value="{{ old('avatar_pic') }}" name="avatar_pic" id="avatar_pic" class="form-control text-left d-ltr" placeholder="{{ __('avatar_pic') }}">
        </div>
        <br><br><br>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3 ">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user-tag"></i></span>
            </div>
            <select name="members[]" id="members" class="form-control text-right" multiple>
                <option></option>
                @foreach ($users as $user)
                    <option value="{{ $user->id }}">{{ $user->fullname }}</option>
                @endforeach
            </select>
        </div>
        <br><br><br>
        <div class="col-md-6 offset-md-6 col-12 input-group float-right mb-3">
            <textarea required rows="10" name="description" id="description" class="form-control" placeholder="{{ __('description') }}">{{ old('description') }}</textarea>
        </div>
        <div class="col-12 p-3 float-right text-right">
            <button type="submit" class="btn btn-outline-primary">{{ __('save') }}</button>
        </div>
    </form>
@endsection

@push('scripts')
    <script>
        $('#members').select2({
            placeholder: "{{ __('employees') }}"
        });
    </script>
@endpush