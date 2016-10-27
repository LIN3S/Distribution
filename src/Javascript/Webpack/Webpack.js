/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2015-2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <bespina@lin3s.com>
 */

'use strict';

import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {join} from 'path';
import precss from 'precss';
import Webpack from 'webpack';

import Modernizr from './Plugins/Modernizr';
import SvgStore from './Plugins/SvgStore';
import UglifyJs from './Plugins/UglifyJs';

const isProdEnvironment = (options) => {
  return typeof options !== 'undefined' && options.env === 'prod';
};

const optionsOf = (plugin, options) => {
  let defaultOptions;
  if (typeof options.plugins !== 'undefined' && typeof options.plugins[plugin] !== 'undefined') {
    defaultOptions = options.plugins[plugin];
  }

  return defaultOptions;
};

const getPlugins = (options) => {
  const plugins = [
    SvgStore(optionsOf('svgStore', options)),
    new ExtractTextPlugin(options.output.cssRoute),
    new Webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(options.postcss.autoprefixer),
          precss
        ],
        sassLoader: {
          includePaths: [join(__dirname, options.input.scss)]
        },
      }
    })
  ];

  if (isProdEnvironment(options)) {
    plugins.push(UglifyJs(optionsOf('uglifyjs', options)));
    plugins.push(Modernizr(optionsOf('modernizr', options)));
  }

  return plugins;
};

const getLoaders = (include, options) => {
  const loaders = [{
    test: /\.js$/,
    loader: 'babel',
    include,
    query: {
      compact: false
    }
  }, {
    test: /\.json$/,
    loader: 'json'
  }, {
    test: /\.(s?css)$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: ['css-loader', 'postcss-loader', 'sass-loader']
    })
  }];

  if (typeof options.module !== 'undefined' && typeof options.module.loaders !== 'undefined') {
    loaders.push(options.module.loaders);
  }

  return loaders;
};

export default (customOptions) => {
  const include = join(__dirname, customOptions.input.base);

  return (webpackOptions) => {
    const options = Object.assign(webpackOptions, customOptions);
    return {
      entry: options.entry,
      output: {
        path: options.output.jsPath,
        filename: options.output.jsFilename,
      },
      module: {
        loaders: getLoaders(include, options),
      },
      resolve: {
        modules: [
          include,
          'node_modules'
        ],
        extensions: [
          '.js',
          '.json'
        ],
        alias: options.alias,
      },
      plugins: getPlugins(options),
      devtool: isProdEnvironment(options) ? false : 'source-map'
    };
  }
}
