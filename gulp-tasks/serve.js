'use strict'

import { paths } from '../gulpfile.babel'
import gulp from 'gulp'
import browsersync from 'browser-sync'

gulp.task('serve', () => {
    browsersync.init({
        server: paths.build.general,
        port: 9000,
        tunnel: false,
        notify: false,
        middleware: function (req, res, next) {
            if (
                /\.json|\.txt|\.html/.test(req.url) &&
                req.method.toUpperCase() == 'POST'
            ) {
                console.log('[POST => GET] : ' + req.url)
                req.method = 'GET'
            }
            next()
        },
    })
    gulp.watch(paths.src.pug, gulp.parallel('views'))
    gulp.watch(paths.src.stylesWatch, gulp.parallel('styles'))
    gulp.watch(paths.src.scriptsWatch, gulp.parallel('scripts'))
    gulp.watch(paths.src.static, gulp.parallel('static'))
    gulp.watch(paths.src.stylesStatic, gulp.parallel('stylesstatic'))
    gulp.watch(paths.src.iconfont, gulp.parallel('iconfont'))
    gulp.watch(paths.src.svgsprite, gulp.parallel('svgsprite'))
    gulp.watch(paths.src.pngsprite, gulp.parallel('pngsprite'))
    gulp.watch(paths.src.images, gulp.parallel('images'))
    gulp.watch(paths.src.webp, gulp.parallel('webp'))
})
