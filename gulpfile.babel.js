import { src, dest, watch, parallel, series } from 'gulp';
import gulpif from 'gulp-if';
import gulpfilter from 'gulp-filter';
import browsersync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import mincss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';
import webp from 'gulp-webp';
import svgSprite from 'gulp-svg-sprite';
import spritesmith from 'gulp.spritesmith';
import spritesmash from 'gulp-spritesmash';
import plumber from 'gulp-plumber';
import debug from 'gulp-debug';
import clean from 'gulp-clean';
import yargs from 'yargs';
import fs from 'fs';
import log from 'fancy-log';
import colors from 'ansi-colors';
import webpack from 'webpack-stream';

const argv = yargs.argv;
const production = !!argv.production;
global.isDev = !production;

const paths = {
    src: {
        pug: [
            './src/views/**/*.pug'
        ],
        stylesBuild: './src/scss/*.scss',
        stylesWatch: './src/scss/**/*',
        stylesStatic: ['./src/scss/fonts/**/*', './src/scss/vendor/**/*', './src/scss/img/**/*'],
        scriptsBuild: './src/js/main.js',
        scriptsWatch: './src/js/**/*',
        static: [
            './src/static/**/*',
            '!./src/static/img/**/*',
        ],
        icons: './src/icons/*.svg',
        sprites: './src/sprites/*',

        images: [
            './src/static/img/**/*.{jpg,jpeg,png,gif,svg}',
            // '!./src/img/icons/svg/*',
            // '!./src/img/icons/favicon.{jpg,jpeg,png,gif}'
        ],
        webp: './src/static/img/**/*.{jpg,jpeg,png}',
    },
    build: {
        clean: ['./dist/*', './dist/.*'],
        general: './dist/',
        static: './dist/assets/',
        styles: './dist/assets/css/',
        scripts: './dist/assets/js/',

        images: './dist/assets/img/',
        webp: './dist/assets/img/',
        sprites: './dist/assets/css/img/sprites/',
    }
};

const pkg = JSON.parse(fs.readFileSync('./package.json'));
const config = JSON.parse(fs.readFileSync('./config.json'));
const locale = config.locale ? JSON.parse(fs.readFileSync('./src/locales/' + config.locale + '.json')) : null;
const pugOptions = {
    pretty: true,
    locals: {
        'DEV': !production,
        'PACKAGE': pkg,
        '__': locale
    }
};

export const errorHandler = (task, title) => {
    return function (err) {
        log.error(task ? colors.red('[' + task + (title ? ' -> ' + title : '') + ']') : '', err.toString());
        this.emit('end');
    };
};

export const server = () => {
    browsersync.init({
        server: paths.build.general,
        port: 9000,
        tunnel: false,
        notify: false
    });
};

export const watchCode = () => {
    watch(paths.src.pug, pugToHTML);
    watch(paths.src.stylesWatch, styles);
    watch(paths.src.stylesStatic, stylesStatic);
    watch(paths.src.scriptsWatch, scripts);
    watch(paths.src.static, copyStatic);
    watch(paths.src.sprites, sprites);
    watch(paths.src.images, images);
    watch(paths.src.webp, webpimages);
};

export const cleanFiles = () => src(paths.build.clean, { read: false })
    .pipe(clean())
    .pipe(debug({
        'title': 'Cleaning...'
    }));

export const pugToHTML = () => src(paths.src.pug)
    .pipe(gulpfilter((file) => {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(pug(pugOptions)).on('error', errorHandler('pugToHtml', 'pug'))
    .pipe(dest(paths.build.general))
    .on('end', browsersync.reload);

export const styles = () => src(paths.src.stylesBuild)
    .pipe(plumber())
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass()).on('error', errorHandler('styles', 'sass'))
    .pipe(gulpif(production, autoprefixer()))
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
    .pipe(dest(paths.build.styles))
    .pipe(debug({
        'title': 'CSS files'
    }))
    .pipe(browsersync.stream({ match: '**/*.css' }));

export const stylesStatic = (done) => {
    src(['./src/scss/vendor/**/*'])
        .pipe(dest(paths.build.styles + 'vendor/'));
    src(['./src/scss/fonts/**/*'])
        .pipe(dest(paths.build.styles + 'fonts/'));
    src(['./src/scss/img/**/*'])
        .pipe(dest(paths.build.styles + 'img/'));
    browsersync.reload();
    done();
};

export const scripts = () => src(paths.src.scriptsWatch)
    .pipe(webpack(require('./webpack.config.js'))).on('error', errorHandler('scripts', 'webpack'))
    .pipe(dest(paths.build.scripts))
    .pipe(debug({
        'title': 'JS files'
    }))
    .on('end', browsersync.reload);

export const copyStatic = () => src(paths.src.static)
    .pipe(dest(paths.build.static))
    .pipe(debug({
        'title': 'Static'
    }))
    .on('end', browsersync.reload);

export const images = () => src(paths.src.images)
    .pipe(gulpif(production, imagemin([
        imageminPngquant({
            speed: 5,
            quality: [0.6, 0.8]
        }),
        imageminZopfli({
            more: true
        }),
        imageminMozjpeg({
            progressive: true,
            quality: 90
        }),
        imagemin.svgo({
            plugins: [
                { removeViewBox: false },
                { removeUnusedNS: false },
                { removeUselessStrokeAndFill: false },
                { cleanupIDs: false },
                { removeComments: true },
                { removeEmptyAttrs: true },
                { removeEmptyText: true },
                { collapseGroups: true }
            ]
        })
    ])))
    .pipe(dest(paths.build.images))
    .pipe(debug({
        'title': 'Images'
    }))
    .on('end', browsersync.reload);

export const webpimages = () => src(paths.src.webp)
    .pipe(webp(gulpif(production, imageminWebp({
        lossless: true,
        quality: 100,
        alphaQuality: 100
    }))))
    .pipe(dest(paths.build.webp))
    .pipe(debug({
        'title': 'Images'
    }))
    .on('end', browsersync.reload);

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
export const svgsprites = () => src(paths.src.icons)
    .pipe(svgSprite(svgSpriteOptions))
    .pipe(dest(paths.build.general))
    .pipe(debug({
        'title': 'SVG-sprites'
    }))
    .on('end', browsersync.reload);

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
export const pngsprites = (done) => {
    src(paths.src.sprites)
        .pipe(spritesmith(spritesmithOptions))
        .pipe(spritesmash())
        .pipe(dest('./src/scss/generated/'));
    //        .pipe(debug({
    //            "title": "Sprites"
    //        }))
    //        .on("end", browsersync.reload);
    src('./src/scss/generated/**.png')
        .pipe(dest(paths.build.styles + 'img/'))
        .pipe(debug({
            'title': 'Sprites'
        }))
        .on('end', browsersync.reload);
    done();
};

export const development = series(
    cleanFiles,
    svgsprites,
    pngsprites,
    stylesStatic,
    parallel(pugToHTML, styles, scripts, copyStatic, images, webpimages),
    parallel(watchCode, server)
);

export const prod = series(
    cleanFiles,
    svgsprites,
    pngsprites,
    stylesStatic,
    pugToHTML,
    styles,
    scripts,
    copyStatic,
    images,
    webpimages
);
export const sprites = series(svgsprites, pngsprites);

export default development;
