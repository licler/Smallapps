$(function () {


    $('.featured-page__inner .tab').on('click', function(event) {
        var id = $(this).attr('data-id');
            $('.featured-page__inner').find('.tab-item').removeClass('active-tab').hide();
            $('.featured-page__inner .tabs').find('.tab').removeClass('active');
            $(this).addClass('active');
            $('#'+id).addClass('active-tab').fadeIn();
            return false;
        });

    $('.gallery-page__items').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            prevArrow: '<button type="button" class="slick-btn slick-prev"><img src="images/about/arrow-prewious.png" alt=""></button>',
            nextArrow: '<button type="button" class="slick-btn slick-next"><img src="images/about/arrow-next.png" alt=""></button>',
            autoplay: true
    });
    $('.clients-page__slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        autoplay: true
     });





});