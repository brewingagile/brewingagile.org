$('#menuButton').on('click',function(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    $('body').toggleClass('menuOpen');
});