@extends('theme.panel')

@section('title')
لیست سمت ها
@endsection

@section('page-content')
    @can('create', \App\Role::class)
        @component('theme.tools.title', ['title' => 'لیست سمت ها', 'create' => route('task-manager.roles.create')]) @endcomponent
    @else
        @component('theme.tools.title', ['title' => 'لیست سمت ها']) @endcomponent
    @endcan
    @component('theme.tools.table')
        @component('theme.tools.table-head')
            <th scope="col">#</th>
            <th scope="col">عنوان</th>
            <th scope="col">کلید</th>
            @if (auth()->user()->hasPermission('can_update_roles'))
            <th scope="col">ویرایش</th>
            @endif
            @if (auth()->user()->hasPermission('can_delete_roles'))
            <th scope="col">حذف</th>
            @endif
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
                    @if (auth()->user()->hasPermission('can_update_roles'))
                    <td>
                        @can('update', $role)
                        <a href="{{ route('task-manager.roles.edit', ['role' => $role->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                        @endcan
                    </td>
                    @endif
                    @if (auth()->user()->hasPermission('can_delete_roles'))
                    <td>
                        @can('delete', $role)
                        <form action="{{ route('task-manager.roles.destroy', ['role' => $role->id]) }}" method="post">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger delete-btn" deleting-item="role">
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
@endsection

@push('scripts')
    @if (config('app.env') == 'local')
    <script src="{{ asset('js/confirmDelete.js') }}"></script> 
    @else
    <script src="{{ asset(mix('js/confirmDelete.js')) }}"></script>
    @endif
@endpush