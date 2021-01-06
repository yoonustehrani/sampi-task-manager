@extends('theme.panel')

@section('title')
لیست اولویت ها
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => 'لیست اولویت ها', 'create' => route('task-manager.proiorities.create')])
        
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
            @foreach ($proiorities as $proiority)
                <tr>
                    <th scope="row">
                        {{ $loop->index + 1 }}
                    </th>
                    <td>
                        {{ $proiority->title }}
                    </td>
                    <td>
                        @if ($proiority->icon_class)
                            <span class="{{ $proiority->color_class ? 'text-' . $proiority->color_class : '' }}">
                                <i class="{{ $proiority->icon_class }} fa-2x"></i>
                            </span>
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('task-manager.proiorities.edit', ['proiority' => $proiority->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                    </td>
                    <td>
                        <form action="{{ route('task-manager.proiorities.destroy', ['proiority' => $proiority->id]) }}" method="post">
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