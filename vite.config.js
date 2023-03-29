import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const pathProject = process.cwd(); 
const pathSrc = path.resolve(pathProject, './src');

// https://v2.vitejs.dev/config/
export default defineConfig({
	root: path.resolve(pathSrc, './static'),
	server: {
		open: 'index.html',
		host: true
	},
	build: {
		outDir: path.resolve(pathProject, './dist'),
		sourcemap: true,
		emptyOutDir: true
	},
	resolve: {
		alias: {
			'~': pathSrc
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import "~/styles/global.scss";
				`
			}
		}
	},
	plugins: [vue()]
});
