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

import ModernizrWebpackPlugin from 'modernizr-webpack-plugin';

const
  defaultOptions = {
    minify: true,
    filename: 'modernizr.js',
    options: [
      "setClasses",
      "addTest",
      "html5printshiv",
      "testProp",
      "fnBind"
    ],
    "feature-detects": [
      "css/flexbox",
      "css/objectfit",
      "touchevents"
    ]
  },
  Modernizr = (options = defaultOptions) => {
    return new ModernizrWebpackPlugin(options);
  };

export default Modernizr;
