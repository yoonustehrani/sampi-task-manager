@extends('theme.panel')

@section('title')
درخواست ها - {{ $demand->title }}
@endsection

@section('page-content')
    <div class="col-12 p-0 float-left">
        <div class="col-lg-3 col-md-4 col-12 float-right ticket-info-section p-3 mb-3">
            <div class="box-section p-0">
                <div class="box-header p-0 col-12 float-left">
                    <div class="box-icon">
                        <i class="fas fa-exclamation text-dark"></i>
                    </div>
                    <p class="box-header-title">اطلاعات درخواست
                        @if ($demand->priority->icon_class)
                            ({{ $demand->priority->title }} <i class="text-{{ $demand->priority->color_class }} {{ $demand->priority->icon_class }}"></i>)
                        @else
                            ({{ $demand->priority->title }})
                        @endif
                    </p>
                </div>
                <div class="box-body p-0 col-12 float-12">
                    <div class="box-body-row col-6">
                        شماره : #{{ $demand->id }}
                    </div>
                    <div class="box-body-row col-12">
                        عنوان : {{ $demand->title }}
                    </div>
                    <div class="box-body-row col-6">
                        از : {{ $demand->from->fullname }}
                    </div>
                    <div class="box-body-row col-6">
                        به : {{ $demand->to->fullname }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-9 col-md-8 col-12 float-right bg-danger mb-3">
            dool
        </div>
        {{-- <h2 class="text-right">
            درخواست ها - {{ $demand->title }} 
            <a href="{{ route('task-manager.workspaces.show', ['workspace' => $workspace->id]) }}" title="{{ $workspace->title }}">
                <img src="{{ asset($workspace->avatar_pic ?: 'male-avatar.svg') }}" alt="{{ $workspace->title }}" height="30" width="30">
            </a>
        </h2>
        @if ($demand->priority)
        <p class="text-right">
            @if ($demand->priority->icon_class)
                <b><i class="text-{{ $demand->priority->color_class }} {{ $demand->priority->icon_class }} fa-2x"></i> {{ $demand->priority->title }}</b>
            @else
                <b>{{ $demand->priority->title }}</b>
            @endif
        </p>
        @endif
        <p class="text-right">
            <b>از طرف: </b>
            <a href="{{ route('task-manager.users.show', ['user' => $demand->from->id]) }}">
                @if ($demand->from->id == auth()->user()->id)
                من
                @else
                {{ $demand->from->fullname }}
                @endif
            </a>
            <br><br>
            <b>به :</b>
            <a href="{{ route('task-manager.users.show', ['user' => $demand->to->id]) }}">
                @if ($demand->to->id == auth()->user()->id)
                من
                @else
                {{ $demand->to->fullname }}
                @endif
            </a>
            <br><br>
            @if ($demand->task_id)
                @php
                    $demand->load('task.workspace')
                @endphp
                <p class="text-right" style="direction: rtl;">
                    <b>وظیفه مرتبط : </b>
                    <a href="{{ route('task-manager.workspaces.show', ['workspace' => $demand->task->workspace->id]) }}" title="{{ $demand->task->workspace->title }}">
                        <img src="{{ asset($demand->task->workspace->avatar_pic ?: 'male-avatar.svg') }}" alt="{{ $demand->task->workspace->title }}" height="30" width="30">
                    </a>
                    <a href="{{ route('task-manager.tasks.show', ['task' => $demand->task->id]) }}">
                    {{ $demand->task->title }}
                    </a>
                </p>
            @endif
        </p>
        <div class="col-12 float-left p-1"
        id="react-demand-show"
        data-messages="{{ route('api.task-manager.demands.messages.index', ['workspace' => $workspace->id, 'demand' => $demand->id]) }}"
        data-message="{{ route('api.task-manager.demands.messages.store', ['workspace' => $workspace->id, 'demand' => $demand->id]) }}"
        data-update="{{ route('api.task-manager.demands.update', ['workspace' => $workspace->id, 'demand' => $demand->id]) }}"
        data-toggle="{{ route('api.task-manager.demands.toggle_state', ['demand' => $demand->id]) }}">
        </div> --}}
    </div>
@endsection