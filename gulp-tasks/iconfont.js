'use strict';

import { paths } from "../gulpfile.babel";
import gulp from 'gulp';
import clean from 'gulp-clean';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';
import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';

const fontname = 'iconfont';
const runTimestamp = Math.round(Date.now() / 1000);

gulp.task('iconfont', () => {
    return gulp.src(paths.src.iconfont)
        .pipe(iconfontCss({
            fontName: fontname,
            path: paths.templates.iconfont,
            targetPath: `${fontname}.scss`,
            fontPath: `fonts/${fontname}/`,
            cacheBuster: runTimestamp,
        }))
        .pipe(iconfont({
            fontName: fontname,
            prependUnicode: false,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            timestamp: runTimestamp,
        }))
        // .on('glyphs', function (glyphs, options) {
        //     // CSS templating, e.g.
        //     console.log(glyphs, options);
        // })
        .pipe(gulp.dest(`${paths.build.iconfont}${fontname}`))
        .pipe(debug({
            'title': 'Iconfont'
        }))
        .on('end', () => {
            gulp.src(`${paths.build.iconfont}/${fontname}/${fontname}.scss`)
                .pipe(clean())
                // .pipe(rename({dirname: ''}))
                .pipe(gulp.dest(`${paths.generated}`))
                .on('end', () => {
                    browsersync.reload
                })
        })
});
