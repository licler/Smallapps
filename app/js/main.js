$(function () {


    $('.featured-page__inner .tab').on('click', function(event) {
        var id = $(this).attr('data-id');
            $('.featured-page__inner').find('.tab-item').removeClass('active-tab').hide();
            $('.featured-page__inner .tabs').find('.tab').removeClass('active');
            $(this).addClass('active');
            $('#'+id).addClass('active-tab').fadeIn();
            return false;
        });






});