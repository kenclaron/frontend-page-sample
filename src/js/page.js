import $ from 'jquery';
import svg4everybody from 'svg4everybody';
import browser from 'browser-detect';
//import FastClick from 'fastclick'; // incopatibility with select2

let page = {
    init: function () {
        const app = this;

        // Base components
        app.window = $(window);
        app.document = $(document);
        app.html = $('html');
        app.body = $('body');

        // App params
        app.browser = browser();
        app.mobile = app.browser.mobile;
        app.html.removeClass('no-js').addClass(app.mobile ? 'mobile' : 'desktop').addClass(app.browser.name);
        if (app.browser.os.indexOf('OS') === 0 || app.browser.os.indexOf('iOS') === 0) {
            app.html.addClass('huapple');
        }

        // svg4everybody | Init
        if (!app.mobile) {
            svg4everybody();
        }

        // FastClick | Init
//        if (app.mobile) {
//            FastClick.attach(document.body);
//        }
        
    }
    
};

export default page;