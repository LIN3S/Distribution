# CHANGELOG

This changelog references the relevant changes done between versions.

To get the diff for a specific change, go to https://github.com/LIN3S/Distribution/commit/XXX where XXX is the change hash 
To get the diff between two versions, go to https://github.com/LIN3S/Distribution/compare/v4.1.0...v4.2.0
* 4.3.3
    * upgraded `uglify-js` and `uglifyjs-webpack-plugin` dependencies
* 4.3.2
    * upgraded `eslint` dependency.
* 4.3.1
    * Added `babel-preset-env` and `babel-preset-minfy` dependencies.
    * Upgraded dependencies.
* 4.3.0
    * Added UglifyJsPlugin plugin to the Webpack base configuration for `prod` environments.
* 4.2.2
* 4.2.1
    * Increased the sass loader precision option to avoid browser bugs with CSS rules' decimals.
* 4.2.0
    * `includedNodeModules` inside the `input` config object to avoid the global `node_modules` exclusion from Webpack.
* 4.1.0
    * Refactored Webpack base configuration to allow project-level plugin injection.
    * Added BundleAnalyzerPlugin to the webpack config tree.
* 4.0.1
    * Removed UglifyJs plugin which is automatically included with "-p" option in the Webpack execution.
* 4.0.0
    * Upgraded Webpack from v2 to v3.
* 3.0.4
* 3.0.3
    * Fixed wrong output js path. 
* 3.0.2
    * Removed unused precss.
    * Configured correctly the post-css-loader.
* 3.0.1
    * Removed unused scsslint-loader configuration.
* 3.0.0
    * [BC break] Replaced `.eslint.yml` in favour of `.eslintrc.js`.
    * [BC break] Upgrade Webpack version from 2.2 to 2.6.
    * Added stylelint loader.
    * Removed SvgStore plugin from default initialization.
