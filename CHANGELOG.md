# CHANGELOG

This changelog references the relevant changes done between versions.

To get the diff for a specific change, go to https://github.com/LIN3S/Distribution/commit/XXX where XXX is the change hash 
To get the diff between two versions, go to https://github.com/LIN3S/Distribution/compare/v2.4.0...v3.0.0

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
