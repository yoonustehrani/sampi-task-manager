@extends('theme.panel')

@section('title')
لیست کاربران
@endsection

@section('page-content')
    @can('create', \App\User::class)
        @component('theme.tools.title', ['title' => 'لیست کاربران', 'create' => route('task-manager.users.create')]) @endcomponent
    @else
        @component('theme.tools.title', ['title' => 'لیست کاربران']) @endcomponent
    @endcan
    @component('theme.tools.table')
        @component('theme.tools.table-head')
            <th scope="col">#</th>
            <th scope="col">نام خانوادگی</th>
            <th scope="col">نام کاربری</th>
            <th scope="col">ایمیل</th>
            <th scope="col">chat id تلگرام</th>
            <th scope="col">سمت ها</th>
            <th scope="col">ویرایش</th>
            @if (auth()->user()->hasPermission('can_delete_users'))
            <th scope="col">حذف</th>
            @endif
        @endcomponent
        @component('theme.tools.table-body')
            @foreach ($users as $user)
                <tr onclick="getUser({{ $user->id }})">
                    <th scope="row">
                        {{ $loop->index + 1 }}
                    </th>
                    <td class="text-right">
                        <img src="{{ asset($user->avatar_pic ?: 'images/user-avatar.png') }}" alt="" style="height: 30px; widh: 30px;">
                        {{ $user->fullname }}
                    </td>
                    <td>
                        <span class="mr-3">{{ $user->name }}</span>
                    </td>
                    <td>
                        {{ $user->email }}
                    </td>
                    <td>
                        @if ($user->telegram_chat_id)
                            {{ $user->telegram_chat_id }}
                        @else
                            <span class="text-secondary"><em>ندارد</em></span>
                        @endif
                    </td>
                    <td>
                        @if (! $user->roles->count())
                            <span class="text-secondary"><em>ندارد</em></span>
                        @endif
                        @foreach ($user->roles as $role)
                            <a target="_blank" href="{{ route('task-manager.roles.edit', ['role' => $role->id]) }}" class="badge badge-{{ b4_random_color_class() }} p-2">{{ $role->label }}</a>
                        @endforeach
                    </td>
                    <td>
                        @can('update', $user)
                        <a href="{{ route('task-manager.users.edit', ['user' => $user->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                        @endcan
                    </td>
                    @if (auth()->user()->hasPermission('can_delete_users'))
                    <td>
                        @if (auth()->user()->id !== $user->id)
                            @can('delete', $user)
                            <form action="{{ route('task-manager.users.destroy', ['user' => $user->id]) }}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-danger delete-btn" deleting-item="user">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                            @endcan
                        @endif
                    </td>
                    @endif
                </tr>
            @endforeach
        @endcomponent
    @endcomponent
    <div class="col-12 p-0 float-right text-center mt-3 mb-4">
        {{ $users->links() }}
    </div>
@endsection

@push('scripts')
    <script>
        $("table").addClass("table-hover")
        function getUser(userId) {
            window.location.href = USER_ROUTE.replace('userId', userId)
        }
    </script>
    @if (config('app.env') == 'local')
    <script src="{{ asset('js/confirmDelete.js') }}"></script> 
    @else
    <script src="{{ asset(mix('js/confirmDelete.js')) }}"></script>
    @endif
@endpush