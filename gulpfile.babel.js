import { parallel, series } from 'gulp'
import yargs from 'yargs'
import fs from 'fs'
import log from 'fancy-log'
import colors from 'ansi-colors'
import requireDir from 'require-dir'

const argv = yargs.argv
export const production = !!argv.production
export const pkg = JSON.parse(fs.readFileSync('./package.json'))

global.isDev = !production

export const paths = {
    generated: './src/scss/generated/',
    templates: {
        iconfont: './src/scss/templates/iconfont.scss',
        pngsprite: './src/scss/templates/pngsprite.scss',
        svgsprite: './src/scss/templates/svgsprite.scss',
    },
    src: {
        pug: ['./src/views/**/*.pug'],
        stylesBuild: './src/scss/*.scss',
        stylesWatch: './src/scss/**/*',
        stylesStatic: [
            './src/scss/fonts/**/*',
            './src/scss/vendor/**/*',
            './src/scss/img/**/*',
        ],
        scriptsBuild: './src/js/main.js',
        scriptsWatch: './src/js/**/*',
        static: ['./src/static/**/*', '!./src/static/img/**/*'],
        iconfont: './src/iconfont/*.svg',
        pngsprite: './src/pngsprite/*.png',
        svgsprite: './src/svgsprite/*.svg',

        images: ['./src/static/img/**/*.{jpg,jpeg,png,gif,svg}'],
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
        pngsprite: './dist/assets/css/img/pngsprite/',
        iconfont: './dist/assets/css/fonts/',
        critical: './dist/assets/css/critical/',
    },
}

requireDir('./gulp-tasks/')

export const errorHandler = (task, title) => {
    return function (err) {
        log.error(
            task
                ? colors.red('[' + task + (title ? ' -> ' + title : '') + ']')
                : '',
            err.toString()
        )
        this.emit('end')
    }
}

export const development = series(
    'clean',
    'svgsprite',
    'pngsprite',
    parallel(
        'views',
        'iconfont',
        'styles',
        'scripts',
        'static',
        'stylesstatic',
        'images',
        'webp'
    ),
    'serve'
)

export const prod = series(
    'clean',
    'svgsprite',
    'pngsprite',
    'static',
    'stylesstatic',
    'views',
    'iconfont',
    'styles',
    'scripts',
    'images',
    'webp'
)

export default development
