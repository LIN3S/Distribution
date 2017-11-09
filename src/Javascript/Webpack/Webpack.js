/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2015-2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <bespina@lin3s.com>
 * @author Mikel Tuesta <mikel@lin3s.com>
 */

import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {join} from 'path';
import Webpack from 'webpack';

import Modernizr from './Plugins/Modernizr';

// Hide DeprecationWarning: loaderUtils.parseQuery()
// received a non-string value which can be problematic
process.noDeprecation = true;

const
  rootPath = './../../../..',
  esLintDefaultOptions = {
    configFile: join(__dirname, `${rootPath}/.eslintrc.js`),
  },
  styleLintDefaultOptions = {
    configFile: join(__dirname, `${rootPath}/.stylelintrc.js`),
    sintax: 'scss',
  };

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

const cssFilename = (options) => {
  const name = (isProdEnvironment(options) === true) && (typeof options.output.cssFilenameProduction !== 'undefined')
    ? options.output.cssFilenameProduction
    : options.output.cssFilename;

  return `${options.output.cssPath}/${name}`;
};

const jsFilename = (options) => {
  return (isProdEnvironment(options) === true) && (typeof options.output.jsFilenameProduction !== 'undefined')
    ? options.output.jsFilenameProduction
    : options.output.jsFilename;
};

const getPlugins = (options, customPlugins) => {
  const plugins = [
    new StyleLintPlugin(styleLintDefaultOptions),
    new ExtractTextPlugin(cssFilename(options)),
    new Webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [join(__dirname, options.input.scss)],
        },
        eslint: typeof options.eslint === 'undefined' ? esLintDefaultOptions : optionsOf('eslint', options),
      },
    }),
    ...customPlugins
  ];

  if (typeof options.manifest !== 'undefined') {
    plugins.push(new ManifestPlugin({fileName: options.manifest}));
  }

  if (typeof options.analyze !== 'undefined' && !isProdEnvironment(options)) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (isProdEnvironment(options)) {
    plugins.push(Modernizr(optionsOf('modernizr', options)));
  }

  return plugins;
};

const nodeModulesInclusion = (options) => {
  if (typeof options.input.includedNodeModules === 'undefined') {
    return [];
  }

  return options.input.includedNodeModules;
};

const getRules = (include, options) => {
  const rules = [{
    test: /\.jsx?$/,
    include: include,
    exclude: excludeNodeModulesExcept(nodeModulesInclusion(options)),
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            'es2015',
            'stage-2',
          ],
          compact: false,
        },
      }, {
        loader: 'eslint-loader',
        options: {
          enforce: 'pre',
        },
      },
    ],
  }, {
    test: /\.json$/,
    use: 'json-loader',
  }, {
    test: /\.(s?css)$/,
    use: ExtractTextPlugin.extract({
      publicPath: typeof options.output.cssPublicPath === 'undefined' ? '/' : options.output.cssPublicPath,
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            autoprefixer(options.postcss.autoprefixer),
          ],
        },
      }, {
        loader: 'sass-loader',
        options: {
          precision: 6
        }
      }]
    })
  }];

  if (typeof options.module !== 'undefined' && typeof options.module.rules !== 'undefined') {
    if (options.module.rules instanceof Array) {
      options.module.rules.forEach(function (rule) {
        rules.push(rule);
      })
    } else {
      rules.push(options.module.rules);
    }
  }

  return rules;
};

/**
 * Method copied from: https://github.com/webpack/webpack/issues/2031#issuecomment-317589620
 */
const excludeNodeModulesExcept = (modules) => {
  const moduleRegExps = modules.map((modName) => (
    new RegExp(`node_modules/${modName}`)
  ));

  return (modulePath) => {
    if (/node_modules/.test(modulePath)) {
      for (let i = 0; i < moduleRegExps.length; i++) {
        if (moduleRegExps[i].test(modulePath)) {
          return false;
        }
      }

      return true;
    }

    return false;
  };
};

export default (customOptions, customPlugins = []) => {
  const include = join(__dirname, `${rootPath}/${customOptions.input.base}`);

  return (webpackOptions) => {
    const options = typeof webpackOptions === 'undefined'
      ? customOptions
      : Object.assign(webpackOptions, customOptions);

    return {
      entry: options.entry,
      output: {
        path: join(__dirname, `${rootPath}/${options.output.jsPath}`),
        publicPath: typeof options.output.jsPublicPath === 'undefined'
          ? options.output.jsPath
          : options.output.jsPublicPath,
        filename: jsFilename(options),
      },
      module: {
        rules: getRules(include, options),
      },
      resolve: {
        modules: [
          include,
          'node_modules',
        ],
        extensions: [
          '.js',
          '.json',
          '.jsx',
          '.css',
          '.scss',
          '.svg',
        ],
        alias: options.alias,
      },
      plugins: getPlugins(options, customPlugins),
      devtool: isProdEnvironment(options) ? false : 'source-map',
    };
  }
}
