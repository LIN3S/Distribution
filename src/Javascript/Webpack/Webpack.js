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

import Modernizr from './Plugins/Modernizr';
import SvgStore from './Plugins/SvgStore';

export default (options) => {
  const
    plugins = [
      SvgStore(),
      new ExtractTextPlugin(options.output.cssRoute)
    ],

    include = join(__dirname, options.input.base),

    loaders = [{
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
    }],

    isProdEnvironment = (options) => {
      return typeof options !== 'undefined' && options.env === 'prod';
    };

  if (typeof options.module !== 'undefined' && typeof options.module.loaders !== 'undefined') {
    loaders.push(options.module.loaders);
  }

  if (isProdEnvironment(options)) {
    let uglifyjsPluginOptions = {}, modernizrPluginOptions = {};
    if (typeof options.plugins !== 'undefined' && typeof options.plugins.uglifyjs !== 'undefined') {
      uglifyjsPluginOptions = options.plugins.uglifyjs;
    }
    if (typeof options.plugins !== 'undefined' && typeof options.plugins.modernizr !== 'undefined') {
      modernizrPluginOptions = options.plugins.modernizr;
    }

    plugins.push(UglifyJs(uglifyjsPluginOptions));
    plugins.push(Modernizr(modernizrPluginOptions));
  }

  return {
    entry: options.entry,
    output: {
      path: options.output.jsPath,
      filename: options.output.jsFilename,
    },
    module: {
      loaders: loaders,
    },
    postcss: [
      autoprefixer(options.postcss.autoprefixer),
      precss
    ],
    sassLoader: {
      includePaths: [join(__dirname, options.input.scss)]
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
    plugins: plugins,
    devtool: isProdEnvironment(options) ? false : 'source-map'
  };
}
