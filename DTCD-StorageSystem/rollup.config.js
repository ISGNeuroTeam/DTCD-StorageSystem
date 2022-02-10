import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import path from 'path';
import pluginMeta from './src/Plugin.Meta';

import json from '@rollup/plugin-json';

import { version } from './package.json';

const watch = Boolean(process.env.ROLLUP_WATCH);

const pluginName = pluginMeta.name;
const outputFile = `${pluginName}.js`;
const outputDirectory = watch
  ? `./../../DTCD/server/plugins/DTCD-${pluginName}_${version}`
  : `./build`;

const plugins = [
  nodeResolve(),
  alias({
    entries: {
      '@': path.resolve(__dirname, 'src'),
      SDK: path.resolve(__dirname, './../DTCD-SDK'),
    },
  }),
  babel({
    babelHelpers: 'bundled',
  }),
  json(),
];

export default {
  plugins,
  input: `./src/Plugin.js`,
  output: {
    file: `${outputDirectory}/${outputFile}`,
    format: 'esm',
    sourcemap: false,
  },
  watch: {
    include: ['./*/**'],
  },
};
