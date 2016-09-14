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

import {join} from 'path';

const include = join(__dirname, 'src/Javascript');

export default {
  entry: './src/Javascript/index',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'lin3s-distribution',
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', include}
    ]
  }
}
