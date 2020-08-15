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
    browsersync.reload();
    done();
});
