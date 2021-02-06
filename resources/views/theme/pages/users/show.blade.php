@extends('theme.panel')

@section('title')
حساب کاربری {{ auth()->user()->id == $user->id ? 'من' : $user->fullname }}
@endsection

@section('page-content')
    {{-- <div class="col-12 float-right mb-3">
        <img class="float-right" src="{{ asset($user->avatar_pic ?: 'images/male-avatar.svg') }}" style="height: 50px; widht: 50px;" alt="">
        <h4 class="text-right mt-3">
            حساب کاربری {{ auth()->user()->id == $user->id ? 'من' : $user->fullname }}
        </h4>
    </div>
    <div class="col-lg-8 offset-lg-2 col-12 float-left">
        <h4 class="col-12 float-right text-center mt-3">پروژه ها</h4>
        @component('theme.tools.table', ['class' => 'table-sm'])
            @component('theme.tools.table-head')
                <th scope="col">#</th>
                <th scope="col">عنوان پروژه</th>
                <th scope="col">کارمندان</th>
                <th scope="col">ویرایش</th>
                <th scope="col">حذف</th>
            @endcomponent
            @component('theme.tools.table-body')
                @foreach ($user->workspaces as $workspace)
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
                        @can('update', $workspace)
                        <a href="{{ route('task-manager.workspaces.edit', ['workspace' => $workspace->id]) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                        @else
                        مجاز نیست
                        @endcan
                        </td>
                        <td>
                        @can('delete', $workspace)
                        <form action="{{ route('task-manager.workspaces.destroy', ['workspace' => $workspace->id]) }}" method="post">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                        @else
                        مجاز نیست
                        @endcan
                        </td>
                    </tr>
                @endforeach
            @endcomponent
        @endcomponent
    </div> --}}
    <div
        id = "user-profile-react"
        workspaces = "{{ route('api.task-manager.workspaces.index', ['api_token' => auth()->user()->api_token]) }}"
        mixed_tasks = "{{ route('api.task-manager.tasks.mixed', ['api_token' => auth()->user()->api_token]) }}"
        mixed_demands = "{{ route('api.task-manager.demands.mixed', ['api_token' => auth()->user()->api_token]) }}"
    ></div>
@endsection

@push('scripts')
    <script src="{{ asset("js/user-profile.js") }}"></script>
    <script src="{{ asset('js/select2.js') }}"></script>
@endpush