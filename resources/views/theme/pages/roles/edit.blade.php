@extends('theme.panel')

@section('title')
ویرایش سمت ({{ $role->name }})
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => "ویرایش سمت شماره #{$role->id}"])@endcomponent
    <form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.roles.update', ['role' => $role->id]) }}" method="post">
        @csrf
        @method('PUT')
        <div class="col-lg-4 col-md-6 col-12 input-group float-right">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-tag"></i></span>
            </div>
            <input type="text" value="{{ old('label') ?: $role->label }}" name="label" id="label" class="form-control" placeholder="{{ __('label') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-font"></i></span>
            </div>
            <input type="text" value="{{ old('name') ?: $role->name }}" name="name" id="name" class="form-control text-left d-ltr" placeholder="{{ __('name') }}">
        </div>
        <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-6 col-12 input-group float-right mt-3">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <select name="permissions[]" id="permissions" class="form-control text-right" multiple>
                <option value="0">{{ __('all') }}</option>
            </select>
        </div>
        <div class="col-12 p-3 float-right text-right">
            <button type="submit" class="btn btn-outline-primary">{{ __('save') }}</button>
        </div>
    </form>
@endsection

@push('scripts')
    <script>
        let perms_route = "{{ route('api.task-manager.permissions.index') }}";
        let perms_of_role_route = "{{ route('api.task-manager.role.permissions', ['role' => $role->id]) }}";
        axios.get(perms_route).then(res => {
            let permissions = res.data;
            axios.get(perms_of_role_route).then(res => {
                let role_permissions = res.data;
                let selected_all = permissions.length === role_permissions.length;
                if (selected_all) {
                    $('#permissions > option[value="0"]').attr('selected', true);
                }
                if (permissions.length > 0 && role_permissions) {
                    permissions.map(perm => {
                        let found = !! role_permissions.find(item => item.key === perm.key);
                        if (! found || selected_all) {
                            $('#permissions').append(`<option value="${perm.id}">${perm.label ? perm.label + ' - ' : ''}${perm.key}</option>`)
                        } else {
                            $('#permissions').append(`<option selected value="${perm.id}">${perm.label ? perm.label + ' - ' : ''}${perm.key}</option>`)
                        }
                    })
                }
                $('#permissions').select2();
            })
        }) 
    </script>
@endpush

