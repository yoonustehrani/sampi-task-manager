@extends('theme.panel')

@section('title')
درخواست ها - {{ $demand->title }}
@endsection

@section('page-content')
    <div class="col-12 float-left">
        <h2 class="text-right">
            درخواست ها - {{ $demand->title }} 
            <a href="{{ route('task-manager.workspaces.show', ['workspace' => $workspace->id]) }}" title="{{ $workspace->title }}">
                <img src="{{ asset($workspace->avatar_pic ?: 'male-avatar.svg') }}" alt="{{ $workspace->title }}" height="30" width="30">
            </a>
        </h2>
        @if ($demand->priority)
        <p class="text-right">
            @if ($demand->priority->icon_class)
                <b><i class="{{ $demand->priority->icon_class }} fa-2x"></i> {{ $demand->priority->title }}</b>
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
        <div
        data-messages="{{ route('api.task-manager.demands.messages.index', ['demand' => $demand->id]) }}"
        data-message="{{ route('api.task-manager.demands.messages.store', ['demand' => $demand->id]) }}"
        class="col-12 float-left p-1">

        </div>
    </div>
@endsection