@extends('theme.panel')

@section('title')
پروژه ({{ $workspace->title }})
@endsection

@section('page-content')
    <div class="col-12 float-right mb-3">
        <img class="float-right" src="{{ asset($workspace->avatar_pic) }}" style="height: 50px; widht: 50px;" alt="">
        <h4 class="text-right mt-3">
            {{ $workspace->title }}
        </h4>
    </div>
    <div class="col-lg-8 col-12 float-right">
        <h4 class="col-12 float-right text-right mt-3">اعضا : </h4>
        @component('theme.tools.table', ['class' => 'table-sm'])
            @component('theme.tools.table-head')
                <th scope="col">#</th>
                <th scope="col" colspan="2"></th>
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
                            <img src="{{ asset($user->avatar_pic ?: 'images/male-avatar.svg') }}" alt="" style="height: 30px; widh: 30px;">
                            <a href="{{ route('task-manager.users.show', ['user' => $user->id]) }}">{{ $user->fullname }}</a>
                        </td>
                        <td>
                            @if ($user->pivot->is_admin)
                                <span class="badge badge-secondary p-1 mr-2">ادمین</span>
                            @endif
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
@endsection