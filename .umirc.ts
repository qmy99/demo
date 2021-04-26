import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: '/',
  proxy: {
    '/WebApi': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^/WebApi': '',
      },
    },
    '/WebImg': {
      target: 'http://localhost:3000/cover',
      changeOrigin: true,
      pathRewrite: {
        '^/WebImg': '',
      },
    },
  },
  fastRefresh: {},
});
