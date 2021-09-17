import $ from 'jquery';
import 'lazysizes';
// import Swiper from 'swiper/bundle';

import page from 'page';
import forms from 'forms';

let app = {

    // параметры, изменяемые в appConfig

    breakpoints: {
        sm: 320,
        md: 768,
        lg: 1280
    },
    media: 320,
    resizeEventName: 'app_resize',
    submitEventName: 'app_submit',
    popupLoadedEventName: 'app_popup_loaded',
    popupClosedEventName: 'app_popup_closed',
    tabChangedEventName: 'app_tab_changed',
    scrollToOffset: 100, // оффсет при скролле до элемента

    init: function () {
        // read config
        if (typeof appConfig === 'object') {
            Object.keys(appConfig).forEach(key => {
                if (Object.prototype.hasOwnProperty.call(app, key)) {
                    app[key] = appConfig[key];
                }
            });
        }

        app.currentID = 0;

        // Init page
        this.page = page;
        this.page.init.call(this);

        app.checkMedia();
        app.window.on('resize', app.checkMedia);
        window.jQuery = $;
        window.app = app;

        // Init forms
        this.forms = forms;
        this.forms.init.call(this);

        app.document.ready(() => {
            this.initScrollTo(); // for example
        });

        // app.window.on('load', () => {
        // });

        // this.document.on(app.resizeEventName, () => {
        // });

        app.body.addClass('_init');

    },

    initScrollTo() {
        document.querySelectorAll('[data-scroll]').forEach(el => {
            let target = document.querySelector(el.dataset.scroll);
            if (target) {
                el.addEventListener('click', () => {
                    const y = target.getBoundingClientRect().top + window.pageYOffset - app.scrollToOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    app.body.removeClass('menu-opened');
                    return false;
                });
            }
        });
    },

    initTabs() {
        $('.js-tabs').each(function () {
            let $wrapper = $(this);
            let $targetWrapper = $wrapper.find('.js-tabs__wrapper');
            let $triggers = $wrapper.find('.js-tabs__trigger[data-href]');
            if (!$triggers.length) {
                return;
            }
            if (!$triggers.filter('._active').length) {
                $triggers.first().addClass('_active');
            }
            $triggers.filter(':not(._active)').each(function () {
                $($(this).data('href')).hide();
            });
            $triggers.filter('._active').each(function () {
                $($(this).data('href')).addClass('_active');
            });
            $triggers.on('click', function () {
                if ($(this).hasClass('_active')) {
                    return;
                }
                let href = $(this).data('href');
                let $target = $(href);
                if (!$target.length) {
                    return;
                }
                $triggers.removeClass('_active');
                $(this).addClass('_active');
                let $parent = $(this).parent();
                $parent.animate({
                    scrollLeft: $parent.scrollLeft() + $(this).position().left - parseInt($parent.css('padding-left')),
                });
                let $current = $wrapper.find('.js-tabs__target._active');
                $targetWrapper.css('height', $current.outerHeight());
                $current.fadeOut();
                $target.css({
                    visibility: 'hidden',
                    display: 'block'
                });
                let targetHeight = $target.outerHeight();
                $target.css({
                    display: 'none',
                    visibility: 'visible'
                });
                $targetWrapper.animate({ height: targetHeight }, () => {
                    $target.fadeIn(() => {
                        $current.removeClass('_active');
                        $target.addClass('_active');
                        $targetWrapper.css('height', 'auto');
                    });
                });
            });

        });
    },

    formatPrice(price) {
        return this.formatNumber(price, 0, ',', ' ');
    },

    formatNumber(number, decimals, dec_point, thousands_sep) {
        // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfix by: Michael White (http://crestidg.com)
        let i, j, kw, kd, km;

        // input sanitation & defaults
        if (isNaN(decimals = Math.abs(decimals))) {
            decimals = 2;
        }
        if (dec_point == undefined) {
            dec_point = ',';
        }
        if (thousands_sep == undefined) {
            thousands_sep = '.';
        }

        i = parseInt(number = (+number || 0).toFixed(decimals)) + '';

        if ((j = i.length) > 3) {
            j = j % 3;
        } else {
            j = 0;
        }

        km = j
                ? i.substr(0, j) + thousands_sep
                : '';
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands_sep);
        kd = (decimals
                ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2)
                : '');

        return km + kw + kd;
    },

    /**
     * Проверяет размер окна и пишет его в app.media
     * @returns void
     */
    checkMedia() {
        let current = app.media;
        for (let key in app.breakpoints) {
            if (app.window.outerWidth() >= app.breakpoints[key]) {
                app.media = app.breakpoints[key];
            }
//            console.log(app.media);
        }
        if (app.media != current) {
            app.document.trigger(app.resizeEventName, {media: app.media});
        }
    },

    uniqID() {
        return `app_id_${app.currentID++}`;
    },

    /**
     * Функция возвращает окончание для множественного числа слова на основании числа и массива окончаний
     * param  iNumber Integer Число на основе которого нужно сформировать окончание
     * param  aEndings Array Массив слов или окончаний для чисел (1, 4, 5),
     *         например ['яблоко', 'яблока', 'яблок']
     * return String
     *
     * https://habrahabr.ru/post/105428/
     */
    getNumEnding(iNumber, aEndings) {
        let sEnding, i;
        iNumber = iNumber % 100;
        if (iNumber >= 11 && iNumber <= 19) {
            sEnding = aEndings[2];
        } else {
            i = iNumber % 10;
            switch (i)
            {
                case (1):
                    sEnding = aEndings[0];
                    break;
                case (2):
                case (3):
                case (4):
                    sEnding = aEndings[1];
                    break;
                default:
                    sEnding = aEndings[2];
            }
        }
        return sEnding;
    },

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

};
app.init();
