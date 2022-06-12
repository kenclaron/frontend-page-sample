'use strict'

import { paths } from '../gulpfile.babel'
import gulp from 'gulp'
import debug from 'gulp-debug'
import svgSprite from 'gulp-svg-sprite'
import browsersync from 'browser-sync'

const svgSpriteOptions = {
    mode: {
        symbol: {
            dest: 'assets/img/svgsprite/',
            sprite: 'svgsprite.svg',
            render: {
                scss: {
                    dest: '../../../../src/scss/generated/svgsprite.scss',
                    template: paths.templates.svgsprite,
                },
            },
            example: true,
        },
    },
}

gulp.task('svgsprite', () => {
    return gulp
        .src(paths.src.svgsprite)
        .pipe(svgSprite(svgSpriteOptions))
        .pipe(gulp.dest(paths.build.general))
        .pipe(
            debug({
                title: 'SVG-sprites',
            })
        )
        .on('end', browsersync.reload)
})
