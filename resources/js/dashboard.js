$('#logout-dropdown, #toggle-logout').on('click', function(e) {
    e.preventDefault();
    $('#logout-form').trigger('submit');
});

$('.has_sub').on('click', function() {
    $(this).toggleClass('active');
    $(' .opener', this).toggleClass('opened');
});

var elem = document.documentElement;
/* View in fullscreen */
function openFullscreen() {
if (elem.requestFullscreen) {
    elem.requestFullscreen();
} else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
} else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
}
}
/* Close fullscreen */
function closeFullscreen() {
if (document.exitFullscreen) {
    document.exitFullscreen();
} else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
}
}

$('.scr-controller').click(function(){
    $(' > i',this).toggleClass('fa-expand-arrows-alt');
    if ($(this).attr('data-event') == 'max') {
        $(this).attr('data-event','min');
        return openFullscreen();
    }
    $(this).attr('data-event','max');
    return closeFullscreen();
});

$('#collapser').click(function(){
    $(' > i',this).toggleClass('fa-angle-double-right fa-angle-double-left');
    $("#left-menu").toggleClass('collapsed');
    $("#mainpage").toggleClass('col-lg-10 col-md-9')
    $("")
});