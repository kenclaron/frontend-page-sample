'use strict';

import { paths } from "../gulpfile.babel";
import gulp from 'gulp';
import debug from 'gulp-debug';
import spritesmith from 'gulp.spritesmith';
import spritesmash from 'gulp-spritesmash';
import browsersync from 'browser-sync';

const spritesmithOptions = {
    imgPath: 'img/sprites.png',
    imgName: 'sprites.png',
    retinaImgPath: 'img/sprites@2x.png',
    retinaImgName: 'sprites@2x.png',
    retinaSrcFilter: ['./src/sprites/**/**@2x.png'],
    cssName: 'sprites.scss',
    cssTemplate: './src/scss/templates/sprites.scss',
    padding: 1
};
gulp.task('pngsprites', (done) => {
    gulp.src(paths.src.sprites)
        .pipe(spritesmith(spritesmithOptions))
        .pipe(spritesmash())
        .pipe(debug({
            'title': 'Sprites'
        }))
        .pipe(gulp.dest('./src/scss/generated/'));
    gulp.src('./src/scss/generated/**.png')
        .pipe(gulp.dest(`${paths.build.styles}img/`))
        .on('end', browsersync.reload);
    done();
});