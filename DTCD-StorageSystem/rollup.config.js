import pluginRegistrationMeta from './src/pluginRegistrationMeta';

const pluginName = pluginRegistrationMeta.name;
const watch = Boolean(process.env.ROLLUP_WATCH);

const output = watch
  ? `./../../DataCAD/Mock_server/plugins/${pluginName}.js`
  : `./dist/${pluginName}.js`;

const plugins = [];

export default {
  plugins,
  input: './src/DataCADPlugin.js',
  output: {
    file: output,
    format: 'esm',
    sourcemap: false,
  },
  watch: {
    include: ['./*/**'],
  },
};
