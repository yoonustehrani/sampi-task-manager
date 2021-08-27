@extends('theme.panel')

@section('title')
درخواست ها - {{ $demand->title }}
@endsection

@section('page-content')
    <div class="col-12 p-0 float-left h-100">
        <div class="col-lg-3 col-md-5 col-sm-12 col-12 float-right ticket-info-section p-3 mb-3">
            <div class="box-section p-0">
                <div class="box-header p-0 col-12 float-left">
                    <div class="box-icon">
                        <i class="fas fa-exclamation text-dark"></i>
                    </div>
                    <p class="box-header-title">اطلاعات درخواست
                        <span data-id="{{ $demand->priority->id }}" id="react-state-priority">
                        @if ($demand->priority->icon_class)
                            ({{ $demand->priority->title }} <i class="text-{{ $demand->priority->color_class }} {{ $demand->priority->icon_class }}"></i>)
                        @else
                            ({{ $demand->priority->title }})
                        @endif
                        </span>
                    </p>
                </div>
                <div class="box-body p-0 col-12 float-12">
                    <div class="box-body-row col-6">
                        <b>شماره :</b> #{{ $demand->id }}
                    </div>
                    <div class="box-body-row col-12" id="react-state-title">
                        <b>عنوان :</b> <span>{{ $demand->title }}</span>
                    </div>
                    <div class="box-body-row col-12">
                        <b>از :</b>
                        @if ($demand->from)
                            <a href="{{ route('task-manager.users.show', ['user' => $demand->from->id]) }}" class="avatar-pic text-secondary">
                                <img src="{{ asset($demand->from->avatar_pic ?: 'images/user-avatar.png') }}" alt="">
                                @if($demand->from->id == auth()->user()->id) من @else {{ $demand->from->fullname }} @endif
                            </a>
                            @if($demand->from_id !== auth()->user()->id && ! $demand->finished_at)
                            <button id="reminder" data-remind="{{ route('api.task-manager.demands.remind', ['demand' => $demand->id, 'side' => 'from', 'api_token' => auth()->user()->api_token]) }}" class="btn btn-sm btn-outline-success">یادآوری</button>
                            @endif
                        @else
                            <i class="fas fa-user-slash"></i>
                        @endif
                    </div>
                    <div class="box-body-row col-12">
                        <b>به :</b>
                        @if ($demand->to)
                            <a href="{{ route('task-manager.users.show', ['user' => $demand->to->id]) }}" class="avatar-pic text-secondary">
                                <img src="{{ asset($demand->to->avatar_pic ?: 'images/user-avatar.png') }}" alt="">
                                @if($demand->to->id == auth()->user()->id) من @else {{ $demand->to->fullname }} @endif
                            </a>
                            @if($demand->to_id !== auth()->user()->id && ! $demand->finished_at)
                            <button id="reminder" data-remind="{{ route('api.task-manager.demands.remind', ['demand' => $demand->id, 'side' => 'to', 'api_token' => auth()->user()->api_token]) }}" class="btn btn-sm btn-outline-success">یادآوری</button>
                            @endif
                        @else
                            <i class="fas fa-user-slash"></i>
                        @endif
                    </div>
                    @if (auth()->user()->id == $demand->from_id || auth()->user()->id == $demand->to_id)
                    <div class="box-body-row col-12 mt-3 text-center">
                        
                    </div>
                    @endif
                    @can('delete', $demand)
                    <div class="box-body-row col-12 mt-3 text-center">
                        <form action="{{ route('task-manager.demands.destroy', ['demand' => $demand->id, 'workspace' => $workspace->id]) }}" method="post">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-outline-danger btn-sm delete-btn" deleting-item="demand">حذف <i class="fas fa-trash"></i></button>
                        </form>
                    </div>
                    @endcan
                </div>
            </div>
            <div class="box-section mt-3 p-0">
                <div class="box-header p-0 col-12 float-left">
                    <div class="box-icon">
                        <i class="fas fa-briefcase text-dark"></i>
                    </div>
                    <p class="box-header-title">اطلاعات پروژه 
                        <span class="avatar-pic">
                            <img src="{{ asset($demand->workspace->avatar_pic ?: 'images/idea.svg') }}" alt="">
                        </span>
                    </p>
                </div>
                <div class="box-body p-0 col-12 float-12">
                    <div class="box-body-row col-12">
                        <b>عنوان :</b>
                        <a href="{{ route('task-manager.workspaces.show', ['workspace' => $workspace->id]) }}" title="{{ $workspace->title }}" class="avatar-pic text-secondary">
                            {{ $workspace->title }}
                        </a>
                    </div>
                    <div class="box-body-row col-12">
                        <b>توضیحات :</b>
                        {{ \Illuminate\Support\Str::words($workspace->description, 30, '...') }}
                    </div>
                </div>
            </div>
            <div class="box-section mt-3 p-0">
                <div class="box-header p-0 col-12 float-left">
                    <div class="box-icon">
                        <i class="far fa-clock text-dark"></i>
                    </div>
                    <p class="box-header-title">اطلاعات زمانی</p>
                </div>
                <div class="box-body p-0 col-12 float-12">
                    <div class="box-body-row col-12">
                        <b>تاریخ ارسال :</b>
                        {{ $demand->created_at }}
                    </div>
                    <div class="box-body-row col-12">
                        <b>آخرین ویرایش :</b>
                        {{ $demand->updated_at->diffForHumans() }}
                    </div>
                    @if (count($demand->messages) > 0)
                    <div id="last-message" class="box-body-row col-12">
                        <b>آخرین پیام :</b>
                        <span>{{ $demand->messages[0]->updated_at->diffForHumans() }}</span>
                    </div>
                    @else
                    <div id="last-message" class="box-body-row col-12 d-none">
                        <b>آخرین پیام :</b>
                        <span></span>
                    </div>
                    @endif
                    @if ($demand->finished_at)
                    <div class="box-body-row col-12">
                        <b>بسته شده :</b>
                        {{ $demand->finished_at->diffForHumans() }}
                    </div>
                    @endif
                </div>
            </div>
            @if ($demand->task)
            @php
                $demand->task->load('workspace')
            @endphp
            @can('view', $demand)
            <div class="box-section mt-3 p-0">
                <div class="box-header p-0 col-12 float-left">
                    <div class="box-icon">
                        <i class="fas fa-tasks text-dark"></i>
                    </div>
                    <p class="box-header-title">وظیفه مربوطه</p>
                </div>
                <div class="box-body p-0 col-12 float-12">
                    <div class="box-body-row col-12">
                        <b>عنوان :</b>
                        <a href="{{ route('task-manager.tasks.show', ['task' => $demand->task->id]) }}">
                            {{ $demand->task->title }}
                        </a>
                    </div>
                    <div class="box-body-row col-12">
                        <b>پروژه :</b>
                        <a href="{{ route('task-manager.workspaces.show', ['workspace' => $demand->task->workspace->id]) }}" title="{{ $demand->task->workspace->title }}" class="avatar-pic text-secondary">
                            <img src="{{ asset($demand->task->workspace->avatar_pic ?: 'images/idea.svg') }}" alt="{{ $demand->task->workspace->title }}">
                            {{ $demand->task->workspace->title }}
                        </a>
                    </div>
                </div>
            </div>
            @endcan
            @endif
        </div>
        <div class="col-lg-9 col-md-7 col-sm-12 col-12 float-right p-3 mb-3 h-100">
            <div
                class="h-100"
                id="react-demand-show"
                data-apiKey="{{ auth()->user()->api_token }}"
                data-messages="{{ route('api.task-manager.demands.messages.index', ['demand' => $demand->id]) }}"
                data-message="{{ route('api.task-manager.demands.messages.store', ['demand' => $demand->id]) }}"
                data-show="{{ route('api.task-manager.demands.show', ['demand' => $demand->id, 'workspace' => $workspace->id]) }}"
                data-update="{{ route('api.task-manager.demands.update', ['workspace' => $workspace->id, 'demand' => $demand->id]) }}"
                data-toggle="{{ route('api.task-manager.demands.toggle_state', ['demand' => $demand->id]) }}">
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @if (config('app.env') == 'local')
    <script src="{{ asset('js/confirmDelete.js') }}"></script>
    <script src="{{ asset('js/demand.js') }}"></script>
    @else
    <script src="{{ asset(mix('js/confirmDelete.js')) }}"></script>
    <script src="{{ asset(mix('js/demand.js')) }}"></script>   
    @endif

    <script>
        $('#reminder').click(function(e) {
            let link = e.target.getAttribute('data-remind');
            console.log(link);
        })
    </script>
@endpush