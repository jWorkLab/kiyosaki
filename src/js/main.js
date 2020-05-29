$(document).ready(function(){
    var thesesSlider = $(".theses-slider");

    thesesSlider.on('initialized.owl.carousel', function(event) {
        var items     = event.item.count;
        var item      = event.item.index;
        $('.theses .owl-control-counter-current').text(item+1);
        $('.theses .owl-control-counter--all').text(items);
    });
    thesesSlider.owlCarousel({
        items: 1,
        nav: false,
        dots: false
    });
    thesesSlider.on('changed.owl.carousel', function(event) {
        var items     = event.item.count;
        var item      = event.item.index;
        $('.theses .owl-control-counter-current').text(item+1);
        $('.theses .owl-control-counter--all').text(items);
    });

    $('.theses .owl-control-btn--prev').on('click', function () {
        thesesSlider.trigger('prev.owl.carousel');
    });

    $('.theses .owl-control-btn--next').on('click', function () {
        thesesSlider.trigger('next.owl.carousel');
    });

});



$(document).ready(function(){
    var partnersSlider = $(".partners-slider");

    partnersSlider.on('initialized.owl.carousel', function(event) {
        var items     = event.item.count;
        var item      = event.item.index;
        $('.partners .owl-control-counter-current').text(item+1);
        $('.partners .owl-control-counter--all').text(items);
    });
    partnersSlider.owlCarousel({
        items: 7,
        slideBy: 1,
        loop: false,
        autoplay: true,
        smartSpeed: 500,
        nav: false,
        dots: false,
        navText: false,
        responsive : {
            0 : {
                items: 3,
                center:true
            },
            576 : {
                items: 3
            },
            992 : {
                items: 5
            },
            1200 : {
                items: 6
            }
        }
    });
    partnersSlider.on('changed.owl.carousel', function(event) {
        var items     = event.item.count;
        var item      = event.item.index;
        $('.partners .owl-control-counter-current').text(item+1);
        $('.partners .owl-control-counter--all').text(items);
    });

    $('.partners .owl-control-btn--prev').on('click', function () {
        partnersSlider.trigger('prev.owl.carousel');
    });

    $('.partners .owl-control-btn--next').on('click', function () {
        partnersSlider.trigger('next.owl.carousel');
    });

});

var day_z = new Date("29 June 2020 00:01"); // January, February, March, April, May, June, July, August, September, October, November, December

function timer() {
    var time_now = new Date(),
        time_delta = day_z - time_now;
    if (time_delta < 0) {
        time_delta = 0;
    }
    var time_day = Math.floor(time_delta / 86400000),
        time_ost = time_delta - Math.floor(time_delta / 86400000) * 86400000,
        time_hrs = Math.floor(time_ost / 3600000);
    time_ost = time_ost - Math.floor(time_ost / 3600000) * 3600000;
    var time_min = Math.floor(time_ost / 60000);
    time_ost = time_ost - Math.floor(time_ost / 60000) * 60000;
    var time_sec = Math.floor(time_ost / 1000);
    if (time_day < 10) {
        time_day = '0' + time_day;
    }
    if (time_hrs < 10) {
        time_hrs = '0' + time_hrs;
    }
    if (time_min < 10) {
        time_min = '0' + time_min;
    }
    if (time_sec < 10) {
        time_sec = '0' + time_sec;
    }
    $('.counter-clock .sec ').text(time_sec);
    $('.counter-clock .hours ').text(time_hrs);
    $('.counter-clock .days ').text(time_day);
    $('.counter-clock .mins ').text(time_min);
    if (time_delta == 0) {
        clearInterval(akcia_interval);
        $('.timer').addClass('over');
    }
    var dney = time_day.toString().length;
    if (dney == 3) {
        //$('.days strong').addClass('three');
    } else if (dney == 2) {
        // $('.days strong').addClass('two')
    }
}

// timer run
var akcia_interval = setInterval(timer, 1);
// ==============

$("input[type='checkbox']").ionCheckRadio();


