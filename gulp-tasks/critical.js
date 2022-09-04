'use strict'

import { paths, errorHandler } from '../gulpfile.babel'
import gulp from 'gulp'
import debug from 'gulp-debug'

const critical = require('critical').stream

gulp.task('critical', () => {
    return gulp
        .src(paths.src.critical)
        .pipe(
            critical({
                base: 'dist/',
                dimensions: [
                    {
                        width: 320,
                        height: 570,
                    },
                    {
                        width: 1280,
                        height: 612,
                    },
                    {
                        width: 1920,
                        height: 916,
                    },
                ],
            })
        )
        .on('error', errorHandler('critical', 'critical'))
        .pipe(gulp.dest(paths.build.critical))
        .pipe(
            debug({
                title: 'Critical',
            })
        )
})
