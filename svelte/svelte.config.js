import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import * as dotenv from 'dotenv';
import replace from '@rollup/plugin-replace';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	plugins: [
		replace({
			process: JSON.stringify({
				env: {
					...dotenv.config().parsed
				}
			}),
		}),
	],
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$lib: resolve('src/lib'),
				}
			}
		}
	}
};

export default config;
