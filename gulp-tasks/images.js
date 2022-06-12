'use strict'

import { paths, production } from '../gulpfile.babel'
import gulp from 'gulp'
import debug from 'gulp-debug'
import browsersync from 'browser-sync'
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import gulpif from 'gulp-if'
import cache from 'gulp-cached'

gulp.task('images', () => {
    return gulp
        .src(paths.src.images)
        .pipe(gulpif(!production, cache('images')))
        .pipe(
            gulpif(
                production,
                imagemin([
                    imageminMozjpeg({
                        progressive: true,
                        quality: 100,
                    }),
                ])
            )
        )
        .pipe(gulp.dest(paths.build.images))
        .pipe(
            debug({
                title: 'Images',
            })
        )
        .on('end', browsersync.reload)
})
