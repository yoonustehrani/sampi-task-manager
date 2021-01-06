@extends('theme.panel')

@section('title')
ویرایش کاربر ({{ $user->name }})
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => "ویرایش کاربر {$user->name}"])@endcomponent
    <form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.users.update', ['user' => $user->id]) }}" method="post">
        @csrf
        @method('PUT')
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input required type="text" value="{{ old('name') ?: $user->name }}" name="name" id="name" class="form-control text-left d-ltr" placeholder="{{ __('username') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input required type="text" value="{{ old('first_name') ?: $user->first_name }}" name="first_name" id="first_name" class="form-control" placeholder="{{ __('first_name') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" value="{{ old('last_name') ?: $user->last_name }}" name="last_name" id="last_name" class="form-control" placeholder="{{ __('last_name') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="far fa-envelope"></i></span>
            </div>
            <input required type="text" value="{{ old('email') ?: $user->email }}" name="email" id="email" class="form-control text-left d-ltr" placeholder="{{ __('email') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-lock"></i></span>
            </div>
            <input type="password" name="password" id="password" class="form-control text-left d-ltr" placeholder="{{ __('password') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-lock"> 2 </i></span>
            </div>
            <input type="password" name="password_confirmation" id="password_confirmation" class="form-control text-left d-ltr" placeholder="{{ __('confirm') . ' ' . __('password') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-image"></i></span>
            </div>
            <input type="text" value="{{ old('avatar_pic') ?: $user->avatar_pic }}" name="avatar_pic" id="avatar_pic" class="form-control text-left d-ltr" placeholder="{{ __('avatar_pic') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right mb-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-paper-plane"></i></span>
            </div>
            <input type="text" value="{{ old('telegram_chat_id') ?: $user->telegram_chat_id }}" name="telegram_chat_id" id="telegram_chat_id" class="form-control text-left d-ltr" placeholder="{{ __('telegram_chat_id') }}">
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
        let roles_route = "{{ route('api.task-manager.roles.index') }}";
        let roles_of_user_route = "{{ route('api.task-manager.user.roles', ['user' => $user->id]) }}";
        axios.get(roles_route).then(res => {
            let roles = res.data;
            axios.get(roles_of_user_route).then(res => {
                let user_roles = res.data;
                if (roles.length > 0 && user_roles) {
                    roles.map(perm => {
                        let found = !! user_roles.find(item => item.name === perm.name);
                        if (! found) {
                            $('#roles').append(`<option value="${perm.id}">${perm.label ? perm.label + ' - ' : ''}${perm.name}</option>`)
                        } else {
                            $('#roles').append(`<option selected value="${perm.id}">${perm.label ? perm.label + ' - ' : ''}${perm.name}</option>`)
                        }
                    })
                }
                $('#roles').select2({
                    placeholder: "{{ __('roles') }}"
                });
            })
        }) 
    </script>
@endpush