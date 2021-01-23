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
                        <img src="{{ asset($workspace->avatar_pic ?: 'images/male-avatar.svg') }}" alt="" style="height: 30px; widh: 30px;">
                        <a href="{{ route('task-manager.workspaces.show', ['workspace' => $workspace->id]) }}">{{ $workspace->title }}</a>
                    </td>
                    <td>
                        @if ($workspace->users_count > 1)
                            {{ $workspace->users_count }} <i class="fas fa-users"></i>
                        @elseif($workspace->users_count)
                            <i class="fas fa-user"></i>
                        @else
                            <i class="fas fa-user-slash"></i>
                        @endif
                    </td>
                    <td>
                        کل : <span class="badge badge-primary">{{ $workspace->tasks_count }}</span>
                        اتمام : <span class="badge badge-success">{{ $workspace->finished_tasks_count }}</span>
                        باقی مانده : <span class="badge badge-danger">{{ $workspace->tasks_count - $workspace->finished_tasks_count }}</span>
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
                            <button type="submit" class="btn btn-sm btn-danger">
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