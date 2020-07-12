'use strict';

import { paths } from "../gulpfile.babel";
import gulp from 'gulp';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';

gulp.task('static', (done) => {
    debug({
        'title': 'Static'
    });
    gulp.src(paths.src.static)
        .pipe(gulp.dest(paths.build.static));
    gulp.src(['./src/scss/vendor/**/*'])
        .pipe(gulp.dest(`${paths.build.styles}vendor/`));
    gulp.src(['./src/scss/fonts/**/*'])
        .pipe(gulp.dest(`${paths.build.styles}fonts/`));
    gulp.src(['./src/scss/img/**/*'])
        .pipe(gulp.dest(`${paths.build.styles}img/`));
    browsersync.reload();
    done();
});