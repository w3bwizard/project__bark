//= ../components/modal.js
$(document).ready(function () { 
    /* Слайдер: https://kenwheeler.github.io/slick/ */

/* Первый слайдер */

    var $slider = $('.slider-container');
    var $customNav = $('.custom-nav');
    var slideTexts = ['Шафи-купе', 'Кухні', 'Спальні', 'Передпокої'];
    var autoplaySpeed = 8000; // 5 секунд на слайд
    var animationSpeed = 500; // Скорость анимации слайдера
    var timer;
    var progressTimer;

    // Инициализация слайдера
    $slider.slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: animationSpeed,
        fade: false,
        cssEase: 'linear',
        autoplay: false, // Отключаем встроенный автоплей
    });

    // Создание кастомной навигации
    slideTexts.forEach(function(text, index) {
        $customNav.append(`
            <div class="nav-item" data-slide="${index}">
                <div class="progress-bar"><div class="progress"></div></div>
                <span class="nav-text">${text}</span>
            </div>
        `);
    });

    // Обработчик клика по навигационным элементам
    $('.nav-item').on('click', function() {
        var index = $(this).data('slide');
        $slider.slick('slickGoTo', index);
    });

    // Функция для запуска таймера слайда
    function startSlideTimer() {
        clearTimeout(timer);
        clearInterval(progressTimer);
        
        $('.progress').stop(true, false).css('width', '0%');
        
        var $currentProgress = $('.nav-item.active').find('.progress');
        var startTime = new Date().getTime();
        var endTime = startTime + autoplaySpeed;
        
        progressTimer = setInterval(function() {
            var now = new Date().getTime();
            var remainingTime = endTime - now;
            if (remainingTime <= 0) {
                clearInterval(progressTimer);
                $currentProgress.css('width', '100%');
            } else {
                var progress = ((autoplaySpeed - remainingTime) / autoplaySpeed) * 100;
                $currentProgress.css('width', progress + '%');
            }
        }, 16); // ~60fps

        timer = setTimeout(function() {
            $slider.slick('slickNext');
        }, autoplaySpeed);
    }

    // Обновление активного слайда
    function updateActiveSlide(index) {
        $('.nav-item').removeClass('active');
        $('.nav-item').eq(index).addClass('active');
        startSlideTimer();
    }

    // Обработчик события смены слайда
    $slider.on('afterChange', function(event, slick, currentSlide) {
        updateActiveSlide(currentSlide);
    });

    // Инициализация первого слайда
    updateActiveSlide(0);

/* Второй слайдер */

    $("#photo-reviews-slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        dots: false,
        autoplay: true,
        prevArrow: '<button type="button" class="slick-prev photo-slider-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next photo-slider-next">Next</button>'        
    }); 
    
/* Фиксированное меню */ 
var header = $('header'),
    sliderH = $('#topslider').innerHeight();
    scrollOffset = $(this).scrollTop();

    if (scrollOffset >= (sliderH - sliderH * 0.25)) {
        header.addClass('header--fixed');    
    } else {
        header.removeClass('header--fixed');
    }

    $(window).on('scroll', function() {
        scrollOffset = $(this).scrollTop();

        if (scrollOffset >= (sliderH - sliderH * 0.25)) {
            header.addClass('header--fixed');    
        } else {
            header.removeClass('header--fixed');
        }
    });
});

/* Обработка клика по бургеру */ 

let button = $('#burger');
let nav = $('.header__nav');
let nav_height = 62;
let link = $('.topnav__link');
let sections = $('.section');

    button.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    link.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    $('.page').click(function (event) {
        if ($(event.target).closest("#burger").length)
            return;
        if ($(event.target).closest("#topnav").length)
            return;
        nav.removeClass('active');
        button.removeClass('active');
    });

    function toggleMenu() {
        nav.toggleClass('active');
        button.toggleClass('active');
    }

    $(document).ready(function() {
        var $fotorama = $('.fotorama').fotorama();
        var fotorama = $fotorama.data('fotorama');
    
        // Добавляем зум на активное изображение
        $fotorama.on('fotorama:show', function() {
            $('.fotorama__stage__frame.fotorama__active').zoom({
                url: $(this).attr('href'),
                magnify: 2 // Уровень увеличения
            });
        });
    });

    var main = new Splide('#main-slider', {
        type: 'fade',
        rewind: true,
        pagination: false,
        arrows: true
    });

    // Инициализация слайдера с миниатюрами
    var thumbnails = new Splide('#thumbnail-slider', {
        fixedWidth: 100,
        fixedHeight: 60,
        gap: 10,
        rewind: true,
        pagination: false,
        focus: 'center',
        isNavigation: true,
        arrows: true,
        breakpoints: {
            600: {
                fixedWidth: 60,
                fixedHeight: 44,
            }
        }
    });

    // Синхронизация слайдеров
    main.sync(thumbnails);
    
    // Запуск обоих слайдеров
    main.mount();
    thumbnails.mount();