import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import base from './base';


export default Object.assign(base, {
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
    commonjs(),
    terser(),
    nodeResolve(),
  ],
  output: Object.assign(base.output, {
    file: 'dist/bundles/themed-jss.es5.min.js',
  }),
});
