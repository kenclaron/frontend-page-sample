'use strict';

import { paths, errorHandler, production, pkg, locale } from "../gulpfile.babel";
import gulp from 'gulp';
import browsersync from 'browser-sync';
import gulpfilter from 'gulp-filter';
import pug from 'gulp-pug';

const pugOptions = {
    pretty: true,
    locals: {
        'DEV': !production,
        'PACKAGE': pkg,
        '__': locale
    }
};

gulp.task('views', () => {
    return gulp.src(paths.src.pug)
        .pipe(gulpfilter((file) => {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        .pipe(pug(pugOptions)).on('error', errorHandler('pugToHtml', 'pug'))
        .pipe(gulp.dest(paths.build.general))
        .on('end', browsersync.reload);
});