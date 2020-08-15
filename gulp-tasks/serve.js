'use strict';

import { paths } from "../gulpfile.babel";
import gulp from 'gulp';
import browsersync from 'browser-sync';

gulp.task('serve', () => {
    browsersync.init({
        server: paths.build.general,
        port: 9000,
        tunnel: false,
        notify: false
    });
    gulp.watch(paths.src.pug, gulp.parallel('views'));
    gulp.watch(paths.src.stylesWatch, gulp.parallel('styles'));
    gulp.watch(paths.src.scriptsWatch, gulp.parallel('scripts'));
    gulp.watch(paths.src.static, gulp.parallel('static'));
    gulp.watch(paths.src.stylesStatic, gulp.parallel('stylesstatic'));
    gulp.watch(paths.src.icons, gulp.parallel('svgsprites'));
    gulp.watch(paths.src.sprites, gulp.parallel('pngsprites'));
    gulp.watch(paths.src.images, gulp.parallel('images'));
    gulp.watch(paths.src.webp, gulp.parallel('webp'));
});
