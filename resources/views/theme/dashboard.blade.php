@extends('theme.panel')

@section('title')
داشبورد
@endsection

@section('page-content')
    <div 
        id = "react-dashboard"
        mixed_tasks = "{{ route('api.task-manager.tasks.mixed', ['api_token' => auth()->user()->api_token]) }}"
        workspace_route = "{{ route('task-manager.workspaces.show', ['workspace' => 'workspaceId']) }}"
        task_route = "{{ route('task-manager.tasks.show', ['task' => 'taskId']) }}"
        workspace_counter = "{{ route('api.task-manager.counter.workspaces', ['api_token' => auth()->user()->api_token]) }}"
        task_counter = "{{ route('api.task-manager.counter.tasks', ['api_token' => auth()->user()->api_token]) }}"
        demand_counter = "{{ route('api.task-manager.counter.demands', ['api_token' => auth()->user()->api_token]) }}"
        workspaces = "{{ route('api.task-manager.workspaces.index', ['api_token' => auth()->user()->api_token]) }}"
    ></div>
@endsection

@push('scripts')
    <script>
        var list_tasks = "{{ route('api.task-manager.tasks.index', ['workspace' => "workspaceId", 'api_token' => auth()->user()->api_token]) }}";
        var add_task = "{{ route('api.task-manager.tasks.store', ['workspace' => "workspaceId", 'api_token' => auth()->user()->api_token]) }}";
        {{-- axios.post(add_task, {
            title: 'Task number 1',
            priority: 1,
            group: 'fictional',
            users: [
                '100',
                '500'
            ]
        }).then(res => {
            console.log(res.data);
        }).catch(e => {
            let {status, data} = e.response;
            if (status === 422) {
                let {errors} = data;
                Object.entries(errors).map(([param, message]) => {
                    console.log(message);
                })
            }
        }) --}}
    </script>
    <script src="{{ asset('/js/dashboard.js') }}"></script>
    <script>
        let formatOption = (option) => {
            if (option.element) {
                let icon_name = option.element.attributes.icon_name.nodeValue
                return $(`<div class="select-option"><i class="${icon_name}"></i>${option.text}</div>`)
            }
        }
        $('#order_select, #order_by_select, #relation_select').select2({
            templateResult: formatOption,
            minimumResultsForSearch: Infinity,
            width: '100%',
            dir: "rtl"
        })
    </script>
@endpush