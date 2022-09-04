'use strict'

import { paths } from '../gulpfile.babel'
import gulp from 'gulp'
import debug from 'gulp-debug'
import spritesmith from 'gulp.spritesmith'
import spritesmash from 'gulp-spritesmash'
import browsersync from 'browser-sync'

const spritesmithOptions = {
    imgPath: 'img/pngsprite.png',
    imgName: 'pngsprite.png',
    retinaImgPath: 'img/pngsprite@2x.png',
    retinaImgName: 'pngsprite@2x.png',
    retinaSrcFilter: ['./src/pngsprite/**/**@2x.png'],
    cssName: 'pngsprite.scss',
    cssTemplate: paths.templates.pngsprite,
    padding: 1,
}
gulp.task('pngsprite', (done) => {
    gulp.src(paths.src.pngsprite)
        .pipe(spritesmith(spritesmithOptions))
        .pipe(spritesmash())
        .pipe(
            debug({
                title: 'Sprites',
            })
        )
        .pipe(gulp.dest('./src/scss/generated/'))
    gulp.src('./src/scss/generated/**.png')
        .pipe(gulp.dest(`${paths.build.styles}img/`))
        .pipe(
            debug({
                title: 'Sprites',
            })
        )
        .on('end', browsersync.reload)
    done()
})
