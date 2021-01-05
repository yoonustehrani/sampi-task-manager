$('#toggle-logout').on('click', function(e) {
    e.preventDefault();
    $('#logout-form').trigger('submit');
});

$('.has_sub').on('click', function() {
    $(this).toggleClass('active');
    $(' .opener', this).toggleClass('opened');
});