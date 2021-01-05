<div class="col-12 float-right mb-3">
    <h2 class="text-right">
        @if (isset($create))
        <a class="btn btn-info" href="{{ $create }}"><i class="fas fa-plus"></i></a>
        @endif
        {{ $title }}
    </h2>
    {{ $slot }}
</div>