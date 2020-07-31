'use strict';

import { paths } from '../gulpfile.babel';
import gulp from 'gulp';
import htmlValidator from 'gulp-w3c-html-validator';
import debug from 'gulp-debug';

gulp.task('validate-html', (done) => {
    debug({
        'title': 'Validate html...'
    });
    gulp.src(`${paths.build.general}/*.html`)
        .pipe(htmlValidator())
        // .pipe(htmlValidator.reporter())
    done();
});