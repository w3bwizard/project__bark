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
});