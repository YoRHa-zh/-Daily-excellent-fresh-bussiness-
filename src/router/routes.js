import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: '首页',
  },
  children: [{
    name: 'Index',
    path: 'index',
    component: () => import('../views/pages/Index.vue'),
    meta: {
      title: '统计',
    },
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录',
  },
},
];

export default routes;
