var DEFAULT_FACTOR = 0.5;

function initParallax() {
    var $parallax = $('*[data-dat-parallax]'), background, $bgElement, $this;

    $parallax.each(function () {
        $this = $(this);
        $this.addClass('datParallax');
        background = $this.css('background');
        $bgElement = $('<div class="datParallaxBackground"></div>');
        $bgElement.css('background', background);
        $this.prepend($bgElement);
        $this.css('background','transparent none');
    });

    setupParallax();
}

function setupParallax() {
    var $parallax = $('*[data-dat-parallax]'), $bgElement, $this, factor;

    $parallax.each(function () {
        $this = $(this);
        factor = parseFloat($this.attr('data-dat-parallax')) || DEFAULT_FACTOR;
        $bgElement = $this.find('.datParallaxBackground');
        $bgElement.height($this.outerHeight() / factor);
        $bgElement.css('top', Math.max(0, -$this.outerHeight() * (factor/2) ));
    });

    rollParallax();
}

function rollParallax() {
    var scrollTop = $(document).scrollTop(), $parallax = $('*[data-dat-parallax]'), $this, $parallaxBg, offset, topOfWindow, bottomOfWindow, topOfElement, bottomOfElement, factor;
    topOfWindow = scrollTop;
    bottomOfWindow = scrollTop + $(window).innerHeight();

    $parallax.each(function () {
        $this = $(this);
        factor = parseFloat($this.attr('data-dat-parallax')) || DEFAULT_FACTOR;
        $parallaxBg = $this.find('.datParallaxBackground');
        topOfElement = $this.offset().top;
        bottomOfElement = $this.offset().top + $this.outerHeight();

        if ((topOfWindow <= topOfElement && topOfElement <= bottomOfWindow) || (topOfWindow <= bottomOfElement && bottomOfElement <= bottomOfWindow)) {
            offset = (scrollTop - ($parallaxBg.offset().top)) * factor;
            $parallaxBg.css('transform', 'translate3d(0,' + offset + 'px,0)');
            if(!$parallaxBg.is(":visible")) {
                $parallaxBg.fadeIn();
            }
        }
    });
}

$(document).ready(function () {

    if(!$('html').hasClass('touch') && $('html').hasClass('csstransforms3d')) {
        initParallax();
        $(window).on('scroll', function () {
            rollParallax();
        });
    }
});
