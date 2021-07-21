@if (session()->has('flash_message'))
<script>
Swal.default.fire({
    icon: '{{ session('flash_message.level') }}',
    title: '{{ session('flash_message.title') }}',
    timer: 1500,
    html: '{{ session('flash_message.message') }}',
    showConfirmButton	: false,
    customClass: {
        content: 'persian-text'
    }
})
</script>
@endif
@if (session()->has('flash_message_overlay'))
<script>
Swal.default.fire({
    icon: '{{ session('flash_message_overlay.level') }}',
    title: '{{ session('flash_message_overlay.title') }}',
    html: '{{ session('flash_message_overlay.message') }}',
    confirmButtonText: 'Okay',
    customClass: {
        content: 'persian-text'
    }
})
</script>
@endif
