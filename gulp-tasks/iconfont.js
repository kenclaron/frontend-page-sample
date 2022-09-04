

import { paths } from '../gulpfile.babel'
import gulp from 'gulp'
import debug from 'gulp-debug'
import iconfont from 'gulp-iconfont'

const fontname = 'iconfont'
const runTimestamp = Math.round(Date.now() / 1000)

gulp.task('iconfont', () => {
    return gulp.src(paths.src.iconfont)
        .pipe(iconfont({
            fontName: fontname,
            prependUnicode: false,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            timestamp: runTimestamp,
            allowEmpty: true,
        }))
        // .on('glyphs', function (glyphs, options) {
        //     // CSS templating, e.g.
        //     console.log(glyphs, options);
        // })
        .pipe(gulp.dest(`${paths.build.iconfont}${fontname}`))
        .pipe(debug({
            'title': 'Iconfont'
        }))
})
