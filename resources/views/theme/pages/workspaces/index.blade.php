@extends('theme.panel')

@section('title')
لیست پروژه ها
@endsection

@section('page-content')
    @can('create', \App\Workspace::class)
    @component('theme.tools.title', ['title' => 'لیست پروژه ها', 'create' => route('task-manager.workspaces.create')]) @endcomponent
    @else
        @component('theme.tools.title', ['title' => 'لیست پروژه ها']) @endcomponent
    @endcan
    
    @component('theme.tools.table')
        @component('theme.tools.table-head')
            <th scope="col">#</th>
            <th scope="col">عنوان پروژه</th>
            <th scope="col">کارمندان</th>
            <th scope="col">وضعیت وظایف</th>
            <th scope="col">نیاز های جاری</th>
            @if (auth()->user()->hasPermission('can_update_workspaces'))
            <th scope="col">ویرایش</th>
            @endif
            @if (auth()->user()->hasPermission('can_delete_workspaces'))
            <th scope="col">حذف</th>
            @endif
        @endcomponent
        @component('theme.tools.table-body')
            @foreach ($workspaces as $workspace)
                <tr>
                    <th scope="row">
                        {{ $loop->index + 1 }}
                    </th>
                    <td class="text-right">
                        <img src="{{ asset($workspace->avatar_pic ?: 'images/idea.svg') }}" alt="" style="height: 30px; widh: 30px;">
                        <a href="{{ route('task-manager.workspaces.show', ['workspace' => $workspace->id]) }}">{{ $workspace->title }}</a>
                    </td>
                    <td>
                        <div class="employees-container horizontal-centerlize">
                            @if (count($workspace->users) > 1)
                                <span>{{ count($workspace->users) }} <i class="fas fa-users"></i></span>
                            @elseif(count($workspace->users))
                                <span><i class="fas fa-user"></i></span>
                            @else
                                <i class="fas fa-user-slash"></i>
                            @endif
                            <div class="dropdown-users d-none">
                                @foreach ($workspace->users as $user)
                                    <div class="user-dropdown-item animated jackInTheBox">
                                        <div class="user-right-flex">
                                            <div class="user-img-container ml-2">
                                                <img src="{{ asset($user->avatar_pic ?: 'images/user-avatar.png') }}" />
                                            </div>
                                            <div class="user-info ml-2">
                                                <p>{{ $user->fullname }}</p>
                                                <a href="{{ route('task-manager.users.show', ['user' => $user->id]) }}">{{"@".$user->name }}</a>
                                            </div>
                                        </div>
                                        <div class="user-label-container">
                                            @if ($user->pivot->is_admin == 1)
                                                <button class="btn btn-sm btn-success rtl admin"><span>ادمین<i class="fas fa-user-tie mr-1"></i></span></button>
                                            @else
                                                <button class="btn btn-sm btn-primary rtl"><span>عضو<i class="fas fa-user mr-1"></i></span></button>
                                            @endif 
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </td>
                    <td class="no-break">
                        کل : <span class="badge badge-primary ml-md-4 d-block d-md-inline mb-1 mb-md-0">{{ $workspace->tasks_count }}</span>
                        اتمام : <span class="badge badge-success ml-md-4 d-block d-md-inline mb-1 mb-md-0">{{ $workspace->finished_tasks_count }}</span>
                        باقی مانده : <span class="badge badge-danger ml-md-4 d-block d-md-inline mb-1 mb-md-0">{{ $workspace->tasks_count - $workspace->finished_tasks_count }}</span>
                    </td>
                    <td>
                        {{ $workspace->demands_left_count }}
                    </td>
                    @if (auth()->user()->hasPermission('can_update_workspaces'))
                    <td>
                        @can('update', $workspace)
                        <a href="{{ route('task-manager.workspaces.edit', ['workspace' => $workspace->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                        @endcan
                    </td>
                    @endif
                    @if (auth()->user()->hasPermission('can_delete_workspaces'))
                    <td>
                        @can('delete', $workspace)
                        <form action="{{ route('task-manager.workspaces.destroy', ['workspace' => $workspace->id]) }}" method="post">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger delete-btn" deleting-item="workspace">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                        @endcan
                    </td>
                    @endif
                </tr>
            @endforeach
        @endcomponent
    @endcomponent
    <div class="col-12 p-0 float-right text-center mt-3 mb-4">
        {{ $workspaces->links() }}
    </div>
@endsection

@push('scripts')
    @if (config('app.env') == 'local')
    <script src="{{ asset('js/confirmDelete.js') }}"></script> 
    @else
    <script src="{{ asset(mix('js/confirmDelete.js')) }}"></script>
    @endif
@endpush