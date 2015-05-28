'use strict';

$(document).ready(function () {

    $(window).load(function () {
        $('.splashscreen').fadeOut('slow');
    });

    var isMobile = false;
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    // Подключение плагина для создания "карусели"
    var $landing = $("#landing");
    $landing.onepage_scroll({
        sectionContainer: ".outer_wrapper",
        updateURL: false
    });

    $('.next-slide-arrow').each(function () {
        $(this).click(function () {
            $landing.moveDown();
        });
        if (isMobile) {
            $(this).hide();
        }
    });

    /**
     * Прицепляет изображение телефона к тексту
     */
    var attachPhoneImage = function () {
        var $phoneImage = $('img.phone__img');

        $phoneImage.each(function () {
            var $this = $(this);


            var $promoBlock = $('.slide__promo-block_right').first(),
                phoneImageWidth = $this.width();

            if ($this.offset().left < $promoBlock.offset().left) {
                var leftOffset = $promoBlock.offset().left - phoneImageWidth - 20;
                $this.css('left', leftOffset);
            }
        });

    };

    /**
     * Подстраивает размер изображения телефона
     * под размер окна браузера пользователя
     */
    var fitPhoneImage = function () {
        var $phoneImage = $('img.phone__img'),
            headerBlockHeight = 130,
            height = $(window).height() - headerBlockHeight;

        $phoneImage.each(function () {
            var $this = $(this);

            $this
                .height(0.8 * height)
                .css('position', 'absolute')
                .css('bottom', 0.1 * height);

            attachPhoneImage();
        });
    };

    if (!isMobile) {
        fitPhoneImage();
        $(window).resize(function () {
            fitPhoneImage();
        });

        // Красивый эффект вылетания слайда,
        // если обновлять с установленным анкором
        setTimeout(fitPhoneImage, 400);
    }

});

