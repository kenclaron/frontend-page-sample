import { parallel, series } from 'gulp';
import yargs from 'yargs';
import fs from 'fs';
import log from 'fancy-log';
import colors from 'ansi-colors';

const argv = yargs.argv;
export const production = !!argv.production;
export const pkg = JSON.parse(fs.readFileSync('./package.json'));
const config = JSON.parse(fs.readFileSync('./config.json'));
export const locale = config.locale ? JSON.parse(fs.readFileSync(`./src/locales/${config.locale}.json`)) : null;

global.isDev = !production;

const requireDir = require("require-dir");

export const paths = {
    generated: './src/scss/generated/',
    templates: {
        iconfont: './src/scss/templates/iconfont.scss',
    },
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
        iconfont: './src/iconfont/*.svg',
        sprites: './src/sprites/*',
        icons: './src/icons/*.svg',
        svgsprites: {
            dest: '../../../../src/scss/generated/svgsprites.scss',
            template: './src/scss/templates/svgsprites.scss'
        },

        images: [
            './src/static/img/**/*.{jpg,jpeg,png,gif,svg}',
        ],
        webp: './src/static/img/**/*.{jpg,jpeg,png}',
        critical: './dist/*.html',
    },
    build: {
        clean: ['./dist/*'],
        general: './dist/',
        static: './dist/assets/',
        styles: './dist/assets/css/',
        scripts: './dist/assets/js/',

        images: './dist/assets/img/',
        webp: './dist/assets/img/',
        sprites: './dist/assets/css/img/sprites/',
        iconfont: './dist/assets/css/fonts/',
        critical: './dist/assets/css/critical/',
    }
};

requireDir("./gulp-tasks/");

export const errorHandler = (task, title) => {
    return function (err) {
        log.error(task ? colors.red('[' + task + (title ? ' -> ' + title : '') + ']') : '', err.toString());
        this.emit('end');
    };
};

export const development = series(
    'clean',
    'svgsprites',
    'pngsprites',
    parallel('views', 'iconfont', 'styles', 'scripts', 'static', 'stylesstatic', 'images', 'webp'),
    'serve'
);

export const prod = series(
    'clean',
    'svgsprites',
    'pngsprites',
    'static',
    'stylesstatic',
    'views',
    'iconfont',
    'styles',
    'scripts',
    'images',
    'webp'
);

export default development;
