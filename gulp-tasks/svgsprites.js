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

// import cheerio from "gulp-cheerio";
// import svgmin from "gulp-svgmin";
// import replace from "gulp-replace";

// gulp.task('svgsprites', () => {
//     return gulp.src(paths.src.icons)
//         .pipe(
//             svgmin({
//                 js2svg: {
//                     pretty: true,
//                 },
//             })
//         )
//         .pipe(
//             cheerio({
//                 run: function ($) {
//                     $("[fill]").removeAttr("fill");
//                     $("[stroke]").removeAttr("stroke");
//                     $("[style]").removeAttr("style");
//                 },
//                 parserOptions: {
//                     xmlMode: true,
//                 },
//             })
//         )

//         .pipe(replace("&gt;", ">"))
//         .pipe(svgSprite(svgSpriteOptions))
//         .pipe(replace(' stroke-width="2"', ""))
//         .pipe(gulp.dest(paths.build.general))
//         .pipe(debug({
//             'title': 'SVG-sprites'
//         }))
//         .on('end', browsersync.reload);
// });
