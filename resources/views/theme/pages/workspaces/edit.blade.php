@extends('theme.panel')

@section('title')
ویرایش پروژه ({{ $workspace->title }})
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => "ویرایش پروژه {$workspace->title}"])@endcomponent
    <form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.workspaces.update', ['workspace' => $workspace->id]) }}" method="post">
        @csrf
        @method('PUT')
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input required type="text" value="{{ old('title') ?: $workspace->title }}" name="title" id="title" class="form-control" placeholder="{{ __('title') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-image"></i></span>
            </div>
            <input type="text" value="{{ old('avatar_pic') ?: $workspace->avatar_pic }}" name="avatar_pic" id="avatar_pic" class="form-control text-left d-ltr" placeholder="{{ __('avatar_pic') }}">
        </div>
        <br><br><br><hr class="d-none d-md-block border-top">
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user-tag"></i></span>
            </div>
            <select name="admins[]" id="admins" class="form-control text-right" multiple>
                <option></option>
                @foreach ($users as $user)
                    <option 
                    @foreach ($workspace->admins as $admin)
                        @if ($admin->id === $user->id)
                            selected
                        @endif
                    @endforeach
                    value="{{ $user->id }}">{{ $user->fullname }}</option>
                @endforeach
            </select>
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user-tag"></i></span>
            </div>
            <select name="members[]" id="members" class="form-control text-right" multiple>
                <option></option>
                @foreach ($users as $user)
                    <option
                    @foreach ($workspace->members as $member)
                        @if ($member->id === $user->id)
                            selected
                        @endif
                    @endforeach
                    value="{{ $user->id }}">{{ $user->fullname }}</option>
                @endforeach
            </select>
        </div>
        {{-- <br><br><br><hr> --}}
        <div class="col-12 input-group float-right mt-md-4 pt-md-3 border-top">
            <textarea required rows="10" name="description" id="description" class="form-control col-lg-6 col-md-6 offset-md-6 col-12" placeholder="{{ __('description') }}">{{ old('description') ?: $workspace->description }}</textarea>
        </div>
        <div class="col-12 p-3 float-right text-right">
            <button type="submit" class="btn btn-outline-primary">{{ __('save') }}</button>
        </div>
    </form>
@endsection

@push('scripts')
    <script>
        $('#admins').select2({
            placeholder: "{{ __('admins') }}"
        });
        $('#members').select2({
            placeholder: "{{ __('employees') }}"
        });
    </script>
@endpush