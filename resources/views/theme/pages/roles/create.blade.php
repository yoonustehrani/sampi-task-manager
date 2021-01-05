@extends('theme.panel')

@section('page-content')
    @component('theme.tools.title', ['title' => 'ایجاد سمت جدید'])@endcomponent
    <form class="col-12 float-left p-0 form-group text-right" action="{{ route('task-manager.roles.store') }}" method="post">
        @csrf
        <div class="col-lg-4 col-md-6 col-12 input-group float-right">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-tag"></i></span>
            </div>
            <input type="text" value="{{ old('label') }}" name="label" id="label" class="form-control" placeholder="{{ __('label') }}">
        </div>
        <div class="col-lg-4 col-md-6 col-12 input-group float-right">
            <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-font"></i></span>
            </div>
            <input type="text" value="{{ old('name') }}" name="name" id="name" class="form-control" placeholder="{{ __('name') }}">
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
        axios.get(perms_route).then(res => {
            let {data} = res;
            data.map(item => {
                $('#permissions').append(`<option value="${item.id}">${item.label ? item.label + ' - ' : ''}${item.key}</option>`)
            })
            $('#permissions').select2();
        }) 
    </script>
@endpush

