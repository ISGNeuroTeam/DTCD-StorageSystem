import pluginMeta from './src/Plugin.Meta';

const pluginName = pluginMeta.name;
const watch = Boolean(process.env.ROLLUP_WATCH);

const output = watch ? `./../../DTCD/server/plugins/${pluginName}.js` : `./build/${pluginName}.js`;

const plugins = [];

export default {
	plugins,
	input: `./src/Plugin.js`,
	output: {
		file: output,
		format: 'esm',
		sourcemap: false,
	},
	watch: {
		include: ['./*/**'],
	},
};
