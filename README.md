### Быстрый старт
`yarn dev`
`yarn build`
`yarn jslint`

# Frontend starter pack (Pug + SCSS)

## Особенности
* сборка для автоматизации задач в повседневной front-end разработке;
* автоматическая перезагрузка страницы в браузере с использованием `browser-sync`;
* автоматическая генерация webp-изображений;
* использование транспайлера [Babel](https://babeljs.io/) для поддержки современного JavaScript (ES6) в браузерах.

## Установка
Установите [Yarn](https://yarnpkg.com/en/docs/install).

> Yarn - это современная альтернатива npm. Yarn работает с тем же файлом `package.json` и так же скачивает необходимые модули в папку `node_modules`, но делает это намного быстрее.

* скачайте сборку: `git clone http://git.riverstart.ru/kirusanov/frontend-pack.git`;
* установите `gulp` глобально: `yarn global add gulp-cli`;
* перейдите в скачанную папку со сборкой: `cd frontend-pack`;
* введите команду, которая скачает необходимые компоненты для корректной работы нашей сборки, указанные в файле `package.json`: `yarn`;
* введите команду: `yarn dev` (режим разработки);
* чтобы «собрать» проект, введите команду `yarn build`.

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером и работающим `browser-sync`.

> Вы можете отключить ненужные таски (например, `pngsprite`), закомментировав соответствующие строки в файле `gulpfile.babel.js`.

## Предустановленные пакеты
Удалите ненужные
* [fancybox](https://fancyapps.com/docs/ui/fancybox)
* [inputmask](https://github.com/RobinHerbots/Inputmask)
* [lazysizes](https://github.com/aFarkas/lazysizes)

### Сборка проекта в режиме разработки
`yarn dev`

### Окончательная сборка
`yarn build`

**Тестировалось на node 16, 14 и 12 под win-64**

[Демо собранного проекта](https://f104.riverstart.ru/frontend-pack/dist/) на чистой сборке.

### Структура каталогов
```
frontend-pack
├── dist Собранный проект
│   └── assets Исходники из src/static
│       ├── js Скомпилированные js
│       └── css Скомпилированные css
└── src Исходные файлы
    ├── iconfont Исходники иконочного шрифта (svg), 
        смотрите рекомендации к исходникам у пакета gulp-iconfont
    └── js js-файлы
        ├── components Самодостаточные компоненты
        └── libs Сторонние библиотеки, которые не получается подключить динамически
    ├── locales Языковые файлы
    ├── pngsprite Исходники png-спрайта (используйте @2 в названии для двойной плотности)
    └── scss
        ├── components Самодостаточные компоненты
        ├── fonts Шрифты
        ├── generated Сгенерированный спрайты и стили шрифтов
        ├── img Изображения, используемые в стилях
        ├── templates Шаблоны спрайтов и шрифтов
        └── vendor Сторонние библиотеки
    └── static Статические файлы
        ├── ajax То, что будем загружать через аякс
        └── img Изображения
    ├── svgsprite Исходники svg-спрайта
    └── views pug-шаблоны
        └── _includes Подключаемые...
            ├── blocks ...блоки
            └── mixins ...миксины
```

### Плагины
* [gulp-if](https://www.npmjs.com/package/gulp-if) - запуск заданий только тогда, когда это нужно;
* [browser-sync](https://browsersync.io/docs/gulp) - живая перезагрузка веб-страницы при внесении изменений в файлы вашего проекта. Одна из опций — tunnel, которая выдаёт вам ссылку, чтобы любой желающий смог посмотреть вашу работу (в обход хостинга);
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) — автоматически расставляет вендорные префиксы в CSS в соответствии с сервисом [Can I Use](https://caniuse.com/);
* [gulp-babel](https://www.npmjs.com/package/gulp-babel) - использование ES6 с [Babel](https://babeljs.io/);
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) — минификация JS-файлов;
* [gulp-pug](https://www.npmjs.com/package/gulp-pug) — компиляция Pug в HTML;
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) - объединение файлов;
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) — компиляция SCSS в CSS;
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) — минификация CSS-файлов;
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - карта стилей;
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) — переименование файлов, добавление суффиксов и префиксов (например, добавление суффикса `.min` к минифицированным файлам);
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) — сжатие изображений;
* [gulp-svg-sprites](https://www.npmjs.com/package/gulp-svg-sprites) — создание SVG-спрайтов;
* [gulp-replace](https://www.npmjs.com/package/gulp-replace) - замена строк;
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) — оповещения в командной строке (например, ошибки в SCSS/Sass);
* [gulp-debug](https://www.npmjs.com/package/gulp-debug) — отладка в терминале;
* [gulp-watch](https://www.npmjs.com/package/gulp-watch) — отслеживание изменений в ваших файлах проекта;
* [gulp-clean](https://www.npmjs.com/package/gulp-clean) — удаление файлов и папок;
* [gulp-iconfont](https://www.npmjs.com/package/gulp-iconfont) — Create SVG/TTF/EOT/WOFF/WOFF2 fonts from several SVG icons with Gulp;
* [yargs](https://www.npmjs.com/package/yargs) - получение аргументов командной строки в Node.js.
