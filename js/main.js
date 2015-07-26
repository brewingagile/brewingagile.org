$('#menuButton').on('click',function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('body').toggleClass('menuOpen');
}).on('touchstart',function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('body').toggleClass('menuOpen');
});

$('#menu section a').on('click',function(event){
    $('body').toggleClass('menuOpen');
}).on('touchstart',function(event){
    $('body').toggleClass('menuOpen');
});
