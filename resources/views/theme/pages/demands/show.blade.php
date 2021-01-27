@extends('theme.panel')

@section('title')
درخواست ها - {{ $demand->title }}
@endsection

@section('page-content')
    @component('theme.tools.title', ['title' => 'درخواست ها - ' . $demand->title]) @endcomponent
    <div class="col-12 float-left">
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
            @if ($demand->task)
                <a href="{{ route('task-manager.tasks.show', ['task' => $demand->task->id]) }}">
                    {{ $demand->task->title }}
                </a>
            @endif
        </p>
    </div>
@endsection