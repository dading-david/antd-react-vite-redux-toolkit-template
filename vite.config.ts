import * as path from 'path';
import { defineConfig, loadEnv, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';

// 引入postcss-pxtorem 用于postcss-pxtorem配置
// import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const { VITE_APP_PORT, VITE_APP_MOCK } = env;

  const isBuild = command === 'build';

  // vite 插件
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    react(),
    // vite-plugin-svg-icons
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(__dirname, './src/assets/iconsvg')],
      // Specify symbolId format
      symbolId: 'icon-[name]',
    }),
  ];
  // vite-plugin-mock
  if (VITE_APP_MOCK === 'true') {
    vitePlugins.push(
      viteMockServe({
        mockPath: 'mock',
        supportTs: true,
        watchFiles: true,
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        logger: true,
      }),
    );
  }

  return {
    root,
    server: {
      host: true,
      port: Number(VITE_APP_PORT || 3000),
      /*
      proxy: {
        '/api': {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          target: 'https://vitejs.dev/config/#server-proxy',
          changeOrigin: true,
        },
      },
      */
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: `${path.resolve(__dirname, './node_modules')}/`,
        },
        {
          find: /@\//,
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
      ],
    },
    plugins: vitePlugins,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      // postcss-pxtorem配置，使px转化为rem (如果需要可放开以下配置代码，并根据需要进行自定义配置)
      // postcss: {
      //   plugins: [
      //     postCssPxToRem({
      //       rootValue: 192, // 设计稿元素尺寸/10
      //       unitPrecision: 5,
      //       propList: ['*'], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
      //       selectorBlackList: [], // 则是一个对css选择器进行过滤的数组，比如你设置为['el-']，那所有el-类名里面有关px的样式将不被转换，这里也支持正则写法。
      //       replace: true,
      //       mediaQuery: false, // 媒体查询( @media screen 之类的)中不生效
      //       minPixelValue: 0, // px 绝对值小于 0 的不会被转换
      //       exclude: /node_modules/i,
      //     })
      //   ]
      // }
    },
  };
});
