import { loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
// import viteCompression from 'vite-plugin-compression';
import uniReadPagesV3Plugin from '@jinghelvdi/core/src/router/utils/uni-read-pages-v3';
import mpliveMainfestPlugin from '@jinghelvdi/core/src/libs/mplive-manifest-plugin';


// https://vitejs.dev/config/
export default (command, mode) => {
	const env = loadEnv(mode, __dirname, 'SHOPRO_');
	return {
		envPrefix: "SHOPRO_",
		plugins: [
			uni(),
			// viteCompression({
			// 	verbose: false
			// }),
			uniReadPagesV3Plugin({
				pagesJsonDir: path.resolve(__dirname, './pages.json'),
				includes: ['path', 'aliasPath', 'name', 'meta'],
			}),
			mpliveMainfestPlugin(env.SHOPRO_MPLIVE_ON)
		],
		server: {
			host: true,
			// open: true,
			port: env.SHOPRO_DEV_PORT,
			hmr: {
				overlay: true,
			},
		},
		optimizeDeps: {
			include: ['weixin-js-sdk'],
			// 强制预构建这些依赖
			force: true
		},
		build: {
			commonjsOptions: {
				include: [/weixin-js-sdk/],
				// 转换 CommonJS 模块
				transformMixedEsModules: true
			}
		}
	};
};
