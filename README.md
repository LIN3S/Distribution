# LIN3S Distribution
> Distribution library for different purposes inside LIN3S.

[![Latest Stable Version](https://img.shields.io/github/release/lin3s/distribution.svg)](https://packagist.org/packages/lin3s/distribution)

Downloads from packagist (PHP):<br>
[![Downloads from Packagist](https://img.shields.io/packagist/dt/lin3s/distribution.svg)](https://packagist.org/packages/lin3s/lin3s-distribution)

Downloads from NPM (JS):<br>
[![Downloads from NPM](http://img.shields.io/npm/dt/lin3s-distribution.svg?style=flat)](https://www.npmjs.org/package/lin3s-distribution)


## Why?
In [LIN3S][1], we are working with many libraries and projects and usually all of them they need scripts to
automatized some process. This library centralize this kind of scripts and tasks improving its reusability.

## Installation
At this moment, this package contains *PHP* and *JavaScript* code, so you can manage this library from [NPM][3] and from [Composer][2].

If your project is in PHP, be sure that the Composer is installed in your system and execute the following command:
```shell
$ composer require lin3s/distribution
```
Otherwise, if your project is in JavaScript, be sure that Node is installed in your system and execute the following command:
```shell
$ npm install lin3s-distribution --save-dev
```

## Usage
The following code is the basic configuration to make work with **Webpack**.
```js
'use strict';

const Webpack = require('lin3s-distribution').Webpack;

const options = {
  entry: {
    'app': './app/Resources/assets/js/entry-app.js',
  },
  input: {
    base: 'app',
    scss: `app/Resources/scss`
  },
  output: {
    jsPath: './web/js',
    jsPublicPath: '/',
    jsFilename: '[name].js',
    jsFilenameProduction: '[name].[chunkhash].js',
    cssPath: '../css',
    cssPublicPath: '/',
    cssFilename: '[name].css',
    cssFilenameProduction: '[name].[contenthash].css'
  },
  postcss: {
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  },
  manifest: '../../manifest.json'
};

module.exports = Webpack(options);
```

## Enabled the hash generation in the Webpack resultant files
The `composer.json`
```json
(...)

"repositories": [
    (...)

    {
        "type": "vcs",
        "url": "https://github.com/LIN3S/twig-webpack-extension"
    }
],
"require": {
    (...)

    "fullpipe/twig-webpack-extension": "dev-master",

    (...)
}
(...)
```
```bash
$ composer update
```
```yml
# app/config/services.yml

services:
    (...)

    twig_extension.webpack:
        public: false
        class: Fullpipe\TwigWebpackExtension\WebpackExtension
        arguments:
            - "%kernel.root_dir%/../manifest.json"
        tags:
            - { name: twig.extension }
```
Finally replace your script and link html tags with the following Twig tags.
```twig
{# app/Resources/views/base.html.twig #}

(...)

<head>
(...)

    {% webpack_entry_css 'app' %}
</head>

<body>
(...)

    {% webpack_entry_js 'app' %}
</body>

```

## Licensing Options
[![License](https://poser.pugx.org/lin3s/distribution/license.svg)](https://github.com/LIN3S/Distribution/blob/master/LICENSE)

[1]: http://lin3s.com
[2]: https://getcomposer.org/
[3]: https://www.npmjs.com/
