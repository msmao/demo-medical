import { defineConfig } from 'umi';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://demo.msmao.com/v1/' : `http://localhost:8000`;
const PUBLIC_PATH = process.env.NODE_ENV === 'production' ? 'https://demo.msmao.com/medical/' : `http://localhost:8000/`;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    BASE_URL,
  },
  publicPath: PUBLIC_PATH,
  hash: true,
  history: { type: 'hash' },
  routes: [
    { path: '/login', component: 'login' },
    {
      path: '/',
      component: '@/layouts/index',
      wrappers: [
        '@/wrappers/auth',
      ],
      routes: [
        { path: '/', component: 'home', },
        { path: '/admin', component: '@/pages/admin/index' },
        { path: '/register', component: '@/pages/register/index' },
      ],
    },
    
  ],
  // outputPath: '../static/html',
  antd: {
    dark: false, // 开启暗色主题
    compact: false, // 开启紧凑主题
  },
  theme: {
    'primary-color': '#d9534f',
  },
  fastRefresh: {},
  mfsu: {},
  proxy: {
    '/api/': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      },
    },
  }
});
