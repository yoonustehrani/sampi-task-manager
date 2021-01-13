@extends('theme.panel')

@section('title')
پروژه ({{ $workspace->title }})
@endsection

@section('page-content')
    <div class="col-md-8 offset-md-2 col-12">
        <div class="col-12 float-right mb-3">
            <img class="float-right" src="{{ asset($workspace->avatar_pic) }}" style="height: 50px; widht: 50px;" alt="">
            <h4 class="text-right mt-3">
                {{ $workspace->title }}
            </h4>
        </div>
        <div class="workspace-sub-info float-right mr-1">
            <span class="ml-4"><i class="far fa-user-circle ml-1"></i><span class="number ml-1">2</span>عضو</span>
            <span class="ml-4"><i class="fas fa-thumbtack ml-1"></i><span class="number ml-1">24</span>وظیفه جاری</span>
            <span class="ml-4"><i class="far fa-check-square ml-1"></i><span class="number ml-1">13</span>وظیفه انجام شده</span>
            <span class="ml-4"><i class="far fa-comments ml-1"></i><span class="number ml-1">45</span>خواسته های جاری</span>
            <span class="ml-4"><i class="far fa-check-circle ml-1"></i><span class="number ml-1">24</span>خواسته های انجام شده</span>
        </div>
        <div class="col-12 float-right">
            <h4 class="col-12 float-right text-right mt-3">اعضا : </h4>
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
                                    <div class="user-info-workspace ml-2">
                                        <img src="{{ asset($user->avatar_pic ?: 'images/male-avatar.svg') }}" alt="">
                                        <a class="mr-2" href="{{ route('task-manager.users.show', ['user' => $user->id]) }}">{{ $user->fullname }}</a>
                                    </div>
                                    @if ($user->pivot->is_admin)
                                        <span class="badge badge-dark">ادمین</span>
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
        <div
            id="workspace-react"
        ></div>
    </div>
@endsection

@section('scripts')
    <script src="{{ asset('js/workspace.js') }}"></script>    
@endsection