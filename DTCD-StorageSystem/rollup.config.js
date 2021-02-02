import pluginRegistrationMeta from './src/pluginRegistrationMeta';

const pluginName = pluginRegistrationMeta.name;
const watch = Boolean(process.env.ROLLUP_WATCH);

const output = watch ? `./../../DTCD/server/plugins/${pluginName}.js` : `./build/${pluginName}.js`;

const plugins = [];

export default {
	plugins,
	input: `./src/${pluginName}.js`,
	output: {
		file: output,
		format: 'esm',
		sourcemap: false,
	},
	watch: {
		include: ['./*/**'],
	},
};
