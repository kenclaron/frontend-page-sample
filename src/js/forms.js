import $ from 'jquery';
import Inputmask from 'inputmask';

let forms = {

    init: function () {
        forms.app = this;

        this.document.ready(() => {
            forms.initInputLabel();
            forms.initMask();
        });
    },

    initInputLabel() {
        let sel = '.js-label input, .js-label textarea';
        let className = '_label-empty';
        this.app.document
            .on('focus', sel, function () {
                $(this).siblings('label').removeClass(className);
            })
            .on('blur', sel, function () {
                if (!$(this).val()) {
                    $(this).siblings('label').addClass(className);
                }
            });
        $(sel).each(function () {
            if (!$(this).val()) {
                $(this).siblings('label').addClass(className);
            }
        });
    },

    initMask() {
        const selector = document.querySelectorAll('input[type="tel"]');
        // простой вариант
        // Inputmask({
        //     mask: '+7 (999) 999 99 99',
        //     showMaskOnHover: false,
        // }).mask(selector);
        // подмена восьмерки, подстановка +7, городские номера
        Inputmask({
            mask: '+7 (999) 999-99-99',
            // mask: '+7 999 999-99-99',
            postValidation: function (buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
                // console.log(pos, c)
                if (pos === 0 && ['0', '8'].indexOf(c) !== -1) {
                    return {
                        pos: 1,
                        c: 7,
                        remove: 4
                    };
                }
                if (pos === 4 && c === '7') {
                    return {
                        // pos: 1,
                        // c: 7,
                        remove: 4
                    };
                }
                return true;
            },
            showMaskOnHover: false,
            jitMasking: true,
        }).mask(selector);
    },

};

export default forms;
