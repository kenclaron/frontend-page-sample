'use strict';

import { paths } from "../gulpfile.babel";
import gulp from 'gulp';
import debug from 'gulp-debug';
import svgSprite from 'gulp-svg-sprite';
import browsersync from 'browser-sync';

const svgSpriteOptions = {
    mode: {
        symbol: {
            dest: 'assets/img/sprites/',
            sprite: 'svgsprites.svg',
            render: {
                scss: {
                    dest: '../../../../src/scss/generated/svgsprites.scss',
                    template: './src/scss/templates/svgsprites.scss'
                }
            },
            example: true
        }
    }
};

gulp.task('svgsprites', () => {
    return gulp.src(paths.src.icons)
        .pipe(svgSprite(svgSpriteOptions))
        .pipe(gulp.dest(paths.build.general))
        .pipe(debug({
            'title': 'SVG-sprites'
        }))
        .on('end', browsersync.reload);
});