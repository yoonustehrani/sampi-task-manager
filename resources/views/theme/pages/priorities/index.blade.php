@extends('theme.panel')

@section('title')
لیست اولویت ها
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => 'لیست اولویت ها', 'create' => route('task-manager.priorities.create')])
        
    @endcomponent
    @component('theme.tools.table')
        @component('theme.tools.table-head')
            <th scope="col">#</th>
            <th scope="col">عنوان</th>
            <th scope="col">آیکون</th>
            <th scope="col">ویرایش</th>
            <th scope="col">حذف</th>
        @endcomponent
        @component('theme.tools.table-body')
            @foreach ($priorities as $priority)
                <tr>
                    <th scope="row">
                        {{ $loop->index + 1 }}
                    </th>
                    <td>
                        {{ $priority->title }}
                    </td>
                    <td>
                        @if ($priority->icon_class)
                            <span class="{{ $priority->color_class ? 'text-' . $priority->color_class : '' }}">
                                <i class="{{ $priority->icon_class }} fa-2x"></i>
                            </span>
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('task-manager.priorities.edit', ['priority' => $priority->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                    </td>
                    <td>
                        <form action="{{ route('task-manager.priorities.destroy', ['priority' => $priority->id]) }}" method="post">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger delete-btn" deleting-item="priority">
                            <i class="fas fa-trash"></i>
                        </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        @endcomponent
    @endcomponent
@endsection

@push('scripts')
    <script src="{{ asset(mix('js/confirmDelete.js')) }}"></script>
@endpush