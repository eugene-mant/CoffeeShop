import { fileURLToPath } from "url";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = (url, base = import.meta.url) => fileURLToPath(new URL(url, base));

// https://v2.vitejs.dev/config/
export default defineConfig({
	root: path('./src/static'),
	server: {
		open: 'index.html',
		host: true,
		headers: {
			// тільки з цими заголовками доступний SharedArrayBuffer,
			// який використовується в absurd-sql
			// але, вони накладають обмеження на наш сайт
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp'
		}
	},
	build: {
		outDir: path('./dist'),
		sourcemap: true,
		emptyOutDir: true
	},
	resolve: {
		alias: {
			'~': path('./src'),
			'@code': path('./code')
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
