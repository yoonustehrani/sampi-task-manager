@extends('theme.panel')

@section('title')
پروژه ({{ $workspace->title }})
@endsection

@section('page-content')
    <div class="col-md-10 offset-md-1 col-12">
        <div class="col-12 float-right mb-3 pr-0 pl-0 pr-md-3 pl-md-3 animated flipInY">
            <img class="float-right" src="{{ asset($workspace->avatar_pic) }}" style="height: 50px; widht: 50px;" alt="">
            <h4 class="text-right mt-3">
                {{ $workspace->title }}
            </h4>
        </div>
        <div class="workspace-sub-info float-right col-12">
            <span><i class="far fa-user-circle ml-1 animated heartBeat delay-2s"></i><span class="number ml-1">2</span>عضو</span>
            <span><i class="fas fa-thumbtack ml-1 animated heartBeat delay-2s"></i><span class="number ml-1">24</span>وظیفه جاری</span>
            <span><i class="far fa-check-square ml-1 animated heartBeat delay-2s"></i><span class="number ml-1">13</span>وظیفه انجام شده</span>
            <span><i class="far fa-comments ml-1 animated heartBeat delay-2s"></i><span class="number ml-1">45</span>خواسته جاری</span>
            <span><i class="far fa-check-circle ml-1 animated heartBeat delay-2s"></i><span class="number ml-1">24</span>خواسته انجام شده</span>
        </div>
        <div class="col-12 float-right pr-0 pl-0 pr-md-3 pl-md-3 animated flipInX">
            <div class="workspace-title-section col-12">
                <i class="fas fa-user-secret"></i>
                <h4 class="">اعضا :</h4>      
            </div>    
            <div class="col-12">
                @component('theme.tools.table', ['class' => 'table-sm'])
                    @component('theme.tools.table-head')
                        <th scope="col">#</th>
                        <th scope="col">نام</th>
                        <th scope="col">وضعیت</th>
                        <th scope="col">سمت سازمانی</th>
                    @endcomponent
                    @component('theme.tools.table-body')
                        @foreach ($workspace->users as $user)
                            <tr>
                                <th scope="row">
                                    {{ $loop->index + 1 }}
                                </th>
                                <td class="text-right">
                                    <div class="name-row-user-workspace">
                                        <div class="user-info-workspace ml-md-2">
                                            <img src="{{ asset($user->avatar_pic ?: 'images/male-avatar.svg') }}" alt="">
                                            <a class="mr-md-2 mt-1 mt-md-0" href="{{ route('task-manager.users.show', ['user' => $user->id]) }}">{{ $user->fullname }}</a>
                                        </div>
                                        @if ($user->pivot->is_admin)
                                            <span class="badge badge-success mt-1 mt-md-0">ادمین</span>
                                        @endif
                                    </div>
                                </td>
                                <td>
                                    وظیفه : <span class="badge badge-warning">{{ $user->tasks_count }} <i class="fas fa-briefcase"></i></span>
                                    درخواست : <span class="badge badge-primary">{{ $user->asked_demands_count }} <i class="fas fa-arrow-down"></i></span>
                                    نیاز : <span class="badge badge-danger">{{ $user->demands_count }} <i class="fas fa-arrow-up"></i></span>
                                </td>
                                <td>
                                    @foreach ($user->roles as $role)
                                        @if (! $loop->last)
                                            {{ $role->label }}،
                                        @else
                                            {{ $role->label }}
                                        @endif
                                    @endforeach
                                </td>
                            </tr>
                        @endforeach
                    @endcomponent
                @endcomponent
            </div>
        </div>
        <div
            id="workspace-react"
            list_tasks_api = "{{ route('api.task-manager.tasks.index', ['workspace' => $workspace->id, 'api_token' => auth()->user()->api_token]) }}"
            add_task_api = "{{ route('api.task-manager.tasks.store', ['workspace' => $workspace->id, 'api_token' => auth()->user()->api_token]) }}"
            task_route = "{{ route('task-manager.tasks.show', ['task' => 'taskId']) }}"
            workspace_api = "{{ route('api.task-manager.workspaces.show', ['workspace' => $workspace->id, 'api_token' => auth()->user()->api_token]) }}"
            logged_in_api_token = "{{ auth()->user()->api_token }}"
        ></div>
    </div>
@endsection

@section('scripts')
    <script src="{{ asset('js/workspace.js') }}"></script>   
    <script src="{{ asset('js/select2.js') }}"></script>
@endsection