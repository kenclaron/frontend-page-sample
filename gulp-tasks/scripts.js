'use strict';

import { paths, errorHandler } from "../gulpfile.babel";
import gulp from 'gulp';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';
import webpack from 'webpack-stream';

gulp.task('scripts', () => {
    return gulp.src(paths.src.scriptsWatch)
        .pipe(webpack(require('../webpack.config.js'))).on('error', errorHandler('scripts', 'webpack'))
        .pipe(gulp.dest(paths.build.scripts))
        .pipe(debug({
            'title': 'JS files'
        }))
        .on('end', browsersync.reload);
});