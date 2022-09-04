# Frontend page sample (Pug + SCSS + Gulp)

> Project for Riverstart (<https://riverstart.ru>)

> Case: Create the provided layout using gulp packing, Pug, SCSS and other libraries. Requirements: cross-browsers supporting (latest versions of Chrome, Firefox and Safari), adhere to pixel-perfect layout principles, creating animations and states for buttons, progress bars, headers

> Stack: `Pug`, `SCSS`, `JavaScript`, `Node.js`, `yarn`, `iconfont`, `webpack`, `babel`. Requirements: `Pixel Perfect HTML-Coding`.

## Features

* Assembly for automating tasks in everyday front-end development;
* Automatic page reload in browser using `browser-sync`;
* Using [Babel](https://babeljs.io/) to support modern JavaScript (ES6) in browsers.

## Usage

### **Using via npm**

* Install `Node.js`: <https://nodejs.org/en/download/>;
* Install `yarn`: <https://classic.yarnpkg.com/en/docs/install>;
* Clone this repository: `git clone https://github.com/kenclaron/frontend-page-sample.git`;
* Go to folder of repository: `cd ./frontend-page-sample`;
* Install `gulp` globally: `yarn global add gulp-cli`;
* Install needed libraries: `yarn` (if you have errors, use alternative npm-command `npm install`);
* Type: `yarn dev` (launching in dev-mode in browser with `browser-sync`)
* Type: `yarn jslint` (checking lint errors)
* Type: `yarn build` (build project for production)
  * Results save in folder `./dist`

```text
  git clone https://github.com/kenclaron/frontend-page-sample.git
  cd ./vue-url-shortener
  yarn global add gulp-cli
  yarn
  yarn dev
  yarn jslint
  yarn build
```

> If you did everything right, you should have a browser open with a local server and running `browser-sync`.

### **Using via Docker**

* Install Node.js - <https://nodejs.org/en/>
* Install Docker - <https://www.docker.com/products/docker-desktop/>
* Install `yarn`: <https://classic.yarnpkg.com/en/docs/install>;
* Type: `yarn global add gulp-cli` to install Gulp CLI globally for correct work
* Type: `docker pull ghcr.io/kenclaron/frontend-page-sample:main` to clone package in Docker
* Type: `docker run -p 8080:80 -it --name frontend-page-sample ghcr.io/kenclaron/frontend-page-sample:main` to launch project
* Open `localhost:8080` or `127.0.0.1:8080`

```text
  yarn global add gulp-cli
  docker pull ghcr.io/kenclaron/frontend-page-sample:main
  docker run -p 8080:80 -it --name frontend-page-sample ghcr.io/kenclaron/frontend-page-sample:main
```

### **Open Webpage**

* Open: `{soon}`

## Plugins

* [browser-sync](https://browsersync.io/docs/gulp) — live reloading of the web page when changes are made to your project files. One of the options - `tunnel`, which gives you a link so that anyone can see your work (bypassing hosting);
* [gulp-if](https://www.npmjs.com/package/gulp-if) — run jobs only when needed;
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) — automatically arranges vendor prefixes in CSS according to the service [Can I Use](https://caniuse.com/);
* [gulp-babel](https://www.npmjs.com/package/gulp-babel) — using `ES6` with [Babel](https://babeljs.io/);
* [gulp-pug](https://www.npmjs.com/package/gulp-pug) — compile `.pug` to `HTML`;
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) — compile `.scss` to `.css`;
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) — merge files;
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) — minimize `.js`;
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) — minimize `.css`;
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) — sourcemaps for styles;
* [gulp-svg-sprites](https://www.npmjs.com/package/gulp-svg-sprites) — create `.svg`-sprites;
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) — rename files, add suffixes and prefixes;
* [gulp-clean](https://www.npmjs.com/package/gulp-clean) — delete files and folders;
* [gulp-replace](https://www.npmjs.com/package/gulp-replace) — replace lines;
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) — notifications in terminal (ex. errors in SCSS/Sass);
* [gulp-debug](https://www.npmjs.com/package/gulp-debug) — debug in terminal;
* [gulp-watch](https://www.npmjs.com/package/gulp-watch) — track changes in your project files;
* [gulp-iconfont](https://www.npmjs.com/package/gulp-iconfont) — create `.svg`/`.ttf`/`.eot`/`.woff`/`.woff2` fonts from several `.svg` icons with `Gulp`;
* [yargs](https://www.npmjs.com/package/yargs) — get command line arguments in Node.js.

## Project folder

```text
frontend-page-sample
├── dist               - Builded project
│   └── assets         - Sources from src/static
│       ├── js         - Compiled .js-files
│       └── css        - Compiled .css-files
│
└── src                - Source fiels
    ├── iconfont       - Source for iconfont (svg), 
    │
    ├── js             - .js-files
    │   ├── components - .js-components
    │   └── libs       - Third-party libraries
    │
    ├── pngsprite      - Sources for .png-sprite
    │
    ├── scss           - .scss-files
    │   ├── components - .scss-components
    │   ├── fonts
    │   ├── generated  - Generated sprites and font styles
    │   ├── img        - Images for styles
    │   ├── templates  - Templated for sprites and fonts
    │   └── vendor     - Third-party styles
    │
    ├── static         - Static files
    │   ├── ajax       - Ajax responses
    │   └── img        - Images
    │
    ├── svgsprite      - Sources for .svg-sprite
    │
    └── views          - .pug-templates
        └── _includes  - Importing files
            ├── blocks - Importing blocks
            └── mixins - Importing mixins
```

## Preview

[<img src="https://i.imgur.com/7Fh7zjg.png" width="48%"/>](https://i.imgur.com/7Fh7zjg.png)
[<img src="https://i.imgur.com/jspbxVR.png" width="48%"/>](https://i.imgur.com/jspbxVR.png)

## License

The **Frontend Page Sample** licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Author

> You can express your gratitude by clicking on one of the links

* [Personal website](https://kenclaron.github.io/kenclaron)
* [VK](https://vk.com/club190729942)
