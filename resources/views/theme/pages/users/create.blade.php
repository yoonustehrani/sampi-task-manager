@extends('theme.panel')

@section('title')
افزودن کاربر
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => 'ایجاد کاربر جدید'])@endcomponent
    <form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.users.store') }}" method="post">
        @csrf
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input required type="text" value="{{ old('name') }}" name="name" id="name" class="form-control text-left d-ltr" placeholder="{{ __('username') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input required type="text" value="{{ old('first_name') }}" name="first_name" id="first_name" class="form-control" placeholder="{{ __('first_name') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" value="{{ old('last_name') }}" name="last_name" id="last_name" class="form-control" placeholder="{{ __('last_name') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="far fa-envelope"></i></span>
            </div>
            <input required type="text" value="{{ old('email') }}" name="email" id="email" class="form-control text-left d-ltr" placeholder="{{ __('email') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-lock"></i></span>
            </div>
            <input required type="password" name="password" id="password" class="form-control text-left d-ltr" placeholder="{{ __('password') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-lock"> 2 </i></span>
            </div>
            <input required type="password" name="password_confirmation" id="password_confirmation" class="form-control text-left d-ltr" placeholder="{{ __('confirm') . ' ' . __('password') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-image"></i></span>
            </div>
            <input type="text" value="{{ old('avatar_pic') }}" name="avatar_pic" id="avatar_pic" class="form-control text-left d-ltr" placeholder="{{ __('avatar_pic') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-paper-plane"></i></span>
            </div>
            <input type="text" value="{{ old('telegram_chat_id') }}" name="telegram_chat_id" id="telegram_chat_id" class="form-control text-left d-ltr" placeholder="{{ __('telegram_chat_id') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user-tag"></i></span>
            </div>
            <select name="roles[]" id="roles" class="form-control text-right" multiple>
                <option></option>
            </select>
        </div>
        <div class="col-12 p-3 float-right text-right">
            <button type="submit" class="btn btn-outline-primary">{{ __('save') }}</button>
        </div>
    </form>
@endsection

@push('scripts')
    <script>
        let perms_route = "{{ route('api.task-manager.roles.index') }}";
        axios.get(perms_route).then(res => {
            let {data} = res;
            data.map(item => {
                $('#roles').append(`<option value="${item.id}">${item.label ? item.label + ' - ' : ''}${item.name}</option>`)
            })
            $('#roles').select2({
                placeholder: "{{ __('roles') }}"
            });
        }) 
    </script>
@endpush