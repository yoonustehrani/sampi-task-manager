@if ($errors->any())
<script>
    Swal.default.fire({
        icon: 'error',
        title: 'خطا',
        html: "@foreach ($errors->all() as $err) {!! "<p class='col-12 float-right text-center'>" !!}{{ $err }}{!! "</p><br>" !!} @endforeach",
        showConfirmButton	: true,
        customClass: {
            content: 'persian-text'
        }
    })
</script>
@endif