
var videoPlayer, playVideo = true;

function has3d() {
    "use strict";
    if (!window.getComputedStyle) {
        return false;
    }

    var el = document.createElement('p'),
        has3d,
        transforms = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
        };

    // Add it to the body to get the computed style
    document.body.insertBefore(el, null);

    for(var t in transforms){
        if( el.style[t] !== undefined ){
            el.style[t] = 'translate3d(1px,1px,1px)';
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }

    document.body.removeChild(el);

    return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}

function setupBackgroundVideo() {
    "use strict";

    var $pageHead = $('#head');

    $pageHead.append('<div id="videobg"></div>');
    $pageHead.append('<div id="videobgShiw"></div>');

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    $('body').append(tag);
}

function pauseAndHideVideo(videoPlayer, intervalToClear) {
    "use strict";
    if (playVideo != false) {
        playVideo = false;

        if(intervalToClear !== undefined) {
            clearInterval(intervalToClear);
        }

        videoPlayer.stopVideo();
        $('#videobg').fadeOut(function () {
            videoPlayer.destroy();
            videoPlayer = undefined;
            $(this).remove();
        });
        $('#videobgShiw').fadeOut(function () {
            $(this).remove();
        });
    }
}

$(document).ready(function () {
    if (!Modernizr.touch) {
        var supports3dtransforms = has3d();
        //setupBackgroundVideo();
    }
});

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubePlayerAPIReady(videoID) {
    player = new YT.Player('videobg', {
        playerVars: { 'start': 2040, 'suggestedQuality':'small', 'autoplay': 1, 'controls': 0,'loop':1, 'playlist':'qt0ah2K2oBU', 'showinfo':0, 'wmode':'opaque', 'fs':0 },
        videoId: 'qt0ah2K2oBU',
        events: {
            'onReady': onPlayerReady
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    var slowmoVideo = undefined;
    videoPlayer = event.target;
    event.target.mute();
    event.target.playVideo();

    if(false) {
        slowmoVideo = setInterval( function() {
            if (playVideo) {
                setTimeout( function() {
                    event.target.playVideo();
                }, 50);
            }

            event.target.pauseVideo();
        }, 100);
    }

    $(window).on('scroll', function () {
        var fromTop = $(window).scrollTop(), windowHeight = $(window).height();
        $('#videobg').css('opacity', Math.max(0, 1 - ((fromTop / windowHeight) * 2.5)));

        if(videoPlayer !== undefined && fromTop > windowHeight) {
            pauseAndHideVideo(videoPlayer, slowmoVideo);
        }
    }).on('resize', function () {
        setupParallax();
    });

    $('#videobgShiw').fadeIn();
    $('#videobg').fadeIn();
}
