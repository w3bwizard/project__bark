//= ../components/modal.js
$(document).ready(function () { 
    /* Слайдер: https://kenwheeler.github.io/slick/ */

    $("#icon-reviews-slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        dots: false,
        autoplay: true,
    });

    $("#photo-reviews-slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        dots: false,
        autoplay: true
    });    
});