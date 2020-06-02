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
        rewind: true,
        // autoplay: true,
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

var day_z = new Date("5 June 2020 00:00"); // January, February, March, April, May, June, July, August, September, October, November, December

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


//Отправка письма
jQuery.validator.addMethod("digits", function(value, element) {
    return this.optional(element) || /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/i.test(value);
});

jQuery.validator.addMethod("letters", function(value, element) {
    return this.optional(element) || /^[а-яА-ЯёЁa-zA-Z_\s]+$/i.test(value);
});

// $(document).ready(function() {
//     $.validator.methods.email = function( value, element ) {
//         return this.optional( element ) || /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/.test( value );
//     };
//     $.validator.addMethod("accept", function(value, element, param) {
//         return value.match(new RegExp("." + param + "$"));
//     });
//     $(".payment-form").validate({
//         rules: {
//             name: {
//                 required: true,
//                 accept: "[а-яА-Я' ']+"
//             },
//             email: {
//                 required: true,
//                 email: true
//             },
//             phone: {
//                 required: true,
//                 minlength: 11,
//                 accept: "[0-9]+"
//             }
//         },
//         messages: {
//             name: "В имени допущена ошибка",
//             email: "E-mail введен некорректно",
//             phone: "В номере телефона ошибка"
//         }
//     });
// });

$("form").each(function(){
    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/.test( value );
    };
    $.validator.addMethod("accept", function(value, element, param) {
        return value.match(new RegExp("." + param + "$"));
    });
    $(this).validate({
        rules: {
            name: {
                required: true,
                accept: "[а-яА-Я' ']+"
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 11,
                accept: "[0-9]+"
            }
        },
        messages: {
            name: "Заполните поле корректно",
            email: "Заполните поле корректно",
            phone: "Заполните поле корректно"
        },

        // errorPlacement: function(error, element) {
        //     return true;
        // },
        submitHandler: function(form) {
            var action = $(form).attr('action'),
                post = $(form).serializeArray()
            // sendmessage_text='Идет регистрация...';
            $.ajax({
                url: action,
                type: 'post',
                data: post,
                dataType: 'json',
                beforeSend: function() {
                    $('.loader').addClass('active');
                },
                success: function(data) {
                    if(data.location) {
                        window.location.href=data.location;
                    }
                },
                complete: function() {
                    $('.loader').removeClass('active');
                }
            });
        }
    })

});

var maskList = $.masksSort($.masksLoad("js/phone-codes.json"), ['#'], /[0-9]|#/, "mask");

var maskOpts = {
    inputmask: {
        definitions: {
            '#': {
                validator: "[0-9]",
                cardinality: 1
            }
        },
        //clearIncomplete: true,
        showMaskOnHover: true,
        autoUnmask: true
    },
    match: /[0-9]/,
    replace: '#',
    list: maskList,
    listKey: "mask",
    onMaskChange: function(maskObj, completed) {
        $(this).attr("placeholder", $(this).inputmask("getemptymask"));
    }
};
$('input[name=phone]').inputmasks(maskOpts).val('7');

$(document).ready(function() {
    $('.scrollto').click(function(){
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top}, 1000);
        return false;
    });
});


