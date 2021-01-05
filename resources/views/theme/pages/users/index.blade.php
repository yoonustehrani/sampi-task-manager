@extends('theme.panel')

@section('page-content')
    @component('theme.tools.title', ['title' => 'لیست کاربران', 'create' => route('task-manager.users.create')])
        
    @endcomponent
    @component('theme.tools.table')
        @component('theme.tools.table-head')
            <th scope="col">#</th>
            <th scope="col">نام کاربری</th>
            <th scope="col">ایمیل</th>
            <th scope="col">chat id تلگرام</th>
            <th scope="col">سمت ها</th>
            <th scope="col">ویرایش</th>
            <th scope="col">حذف</th>
        @endcomponent
        @component('theme.tools.table-body')
            @foreach ($users as $user)
                <tr>
                    <th scope="row">
                        {{ $loop->index + 1 }}
                    </th>
                    <td class="text-right">
                        <img src="{{ asset($user->avatar_pic ?: 'images/male-avatar.svg') }}" alt="" style="height: 30px; widh: 30px;">
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
                            <span class="badge badge-{{ b4_random_color_class() }} p-2">{{ $role->label }}</span>
                        @endforeach
                    </td>
                    <td>
                        <a href="{{ route('task-manager.users.edit', ['user' => $user->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                    </td>
                    <td>
                        <form action="{{ route('task-manager.users.destroy', ['user' => $user->id]) }}" method="post">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger">
                            <i class="fas fa-trash"></i>
                        </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        @endcomponent
    @endcomponent
    <div class="col-12 p-0 float-right text-center mt-3 mb-4">
        {{ $users->links() }}
    </div>
@endsection