@extends('theme.panel')

@section('title')
لیست مجوز ها
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => 'لیست مجوز ها', 'create' => route('task-manager.permissions.create')])
        
    @endcomponent
    @component('theme.tools.table')
        @component('theme.tools.table-head')
            <th scope="col">#</th>
            <th scope="col">کلید</th>
            <th scope="col">برچسب</th>
            <th scope="col">ویرایش</th>
            <th scope="col">حذف</th>
        @endcomponent
        @component('theme.tools.table-body')
            @foreach ($permissions as $permission)
                <tr>
                    <th scope="row">
                        {{ $loop->index + 1 }}
                    </th>
                    <td>
                        <span aria-disabled="true" class="btn btn-sm btn-outline-dark">
                            {{ $permission->key }}
                            <span class="badge badge-secondary mr-2">{{ $permission->roles_count }}</span>
                        </span>
                    </td>
                    <td>
                        {{ $permission->label }}
                    </td>
                    <td>
                        <a href="{{ route('task-manager.permissions.edit', ['permission' => $permission->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                    </td>
                    <td>
                        <form action="{{ route('task-manager.permissions.destroy', ['permission' => $permission->id]) }}" method="post">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger delete-btn" deleting-item="permission">
                            <i class="fas fa-trash"></i>
                        </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        @endcomponent
    @endcomponent
    <div class="col-12 p-0 float-right text-center mt-3 mb-4">
        {{ $permissions->links() }}
    </div>
@endsection

@push('scripts')
    <script src="{{ mix('js/confirmDelete.js') }}"></script>
@endpush