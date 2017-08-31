$('[data-js-menu-button]').on('click', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    $('body').toggleClass('js-menuOpen');
});

$('[data-js-menu-link]').on('click', function(event) {
    $('body').removeClass('js-menuOpen');
});

