@extends('theme.panel')

@section('title')
لیست سمت ها
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => 'لیست سمت ها', 'create' => route('task-manager.roles.create')])
        
    @endcomponent
    @component('theme.tools.table')
        @component('theme.tools.table-head')
            <th scope="col">#</th>
            <th scope="col">عنوان</th>
            <th scope="col">کلید</th>      
            <th scope="col">ویرایش</th>
            <th scope="col">حذف</th>
        @endcomponent
        @component('theme.tools.table-body')
            @foreach ($roles as $role)
                <tr>
                    <th scope="row">
                        {{ $loop->index + 1 }}
                    </th>
                    <td>
                        {{ $role->label }}
                    </td>
                    <td>
                        {{ $role->name }}
                    </td>
                    <td>
                        <a href="{{ route('task-manager.roles.edit', ['role' => $role->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                    </td>
                    <td>
                        <form action="{{ route('task-manager.roles.destroy', ['role' => $role->id]) }}" method="post">
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
@endsection