import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import styleImport, {
  VantResolve
} from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => {
          return `../es/${name}/style/index.mjs`
        },
      }, ],
    }),
  ],
  base: '',
  server: {
    open: false,
    port: 8080
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'views': '@/views',
      'assets': '@/assets',
      'api': '@/api',
      'common': '@/common',
      'components': '@components',
      'network': '@/network',
      'router': '@/router',
      'store': '@/store',
      'utils': '@/utils'
    },
    // 省略文件后缀
    extensions: ['', '.js', '.json', '.vue', '.scss', '.css']
  },
})