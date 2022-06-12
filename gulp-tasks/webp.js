'use strict'

import { paths, production } from '../gulpfile.babel'
import gulp from 'gulp'
import debug from 'gulp-debug'
import browsersync from 'browser-sync'
import gulpif from 'gulp-if'
import imageminWebp from 'imagemin-webp'
import webp from 'gulp-webp'
import cache from 'gulp-cached'

gulp.task('webp', () => {
    return gulp
        .src(paths.src.webp)
        .pipe(gulpif(!production, cache('webp')))
        .pipe(
            webp(
                gulpif(
                    production,
                    imageminWebp({
                        lossless: true,
                        quality: 100,
                        alphaQuality: 100,
                    })
                )
            )
        )
        .pipe(gulp.dest(paths.build.webp))
        .pipe(
            debug({
                title: 'Webp',
            })
        )
        .on('end', browsersync.reload)
})
