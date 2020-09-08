import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

const copyConfig = {
    targets: [
      { src: 'src/index.html', dest: 'build/src' },
    ],
  };

const config = {
  input: 'src/app.js',
  output: {
    dir: 'build/src',
    format: 'es',
  },
  plugins: [
    minifyHTML(),
    copy(copyConfig),
    resolve(),
  ],
  preserveEntrySignatures: false,
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(terser());
}

export default config;