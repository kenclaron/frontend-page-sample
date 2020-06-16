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
        let sel = '.js-label input:not([required]), .js-label textarea:not([required])';
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
        let selector = document.querySelectorAll('.js-mask__tel');
        Inputmask({
            mask: '+7 (999) 999 99 99',
            showMaskOnHover: false,
        }).mask(selector);
    },
    
};

export default forms;