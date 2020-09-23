'use strict';

import { paths, errorHandler, production } from "../gulpfile.babel";
import gulp from 'gulp';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import mincss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import gcmq from 'gulp-group-css-media-queries';

gulp.task('styles', () => {
    return gulp.src(paths.src.stylesBuild)
        .pipe(plumber())
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(sass()).on('error', errorHandler('styles', 'sass'))
        .pipe(gulpif(production, autoprefixer()))
        .pipe(gcmq())
        .pipe(gulpif(production, mincss({
            compatibility: '*', level: {
                1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhitespace: true
                },
                2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false
                }
            }
        })))
        .pipe(plumber.stop())
        .pipe(gulpif(!production, sourcemaps.write('./maps/')))
        .pipe(gulp.dest(paths.build.styles))
        .pipe(debug({
            'title': 'CSS files'
        }))
        .pipe(browsersync.stream({ match: '**/*.css' }));
});
