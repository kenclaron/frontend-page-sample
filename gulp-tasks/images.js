import { paths, production } from '../gulpfile.babel'
import gulp from 'gulp'
import debug from 'gulp-debug'
import browsersync from 'browser-sync'
import gulpif from 'gulp-if'
import cache from 'gulp-cached'

gulp.task('images', () => {
    return gulp
        .src(paths.src.images)
        .pipe(gulpif(!production, cache('images')))
        .pipe(gulp.dest(paths.build.images))
        .pipe(
            debug({
                title: 'Images',
            })
        )
        .on('end', browsersync.reload)
})
