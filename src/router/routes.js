import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import register from '../views/layout/register.vue';

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: '首页',
    icon: 'home',
    hidden: false,
  },
  children: [{
    name: 'Index',
    path: 'index',
    component: () => import('../views/pages/Index.vue'),
    meta: {
      title: '统计',
      icon: 'area-chart',
      hidden: false,
    },
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录',
    hidden: true,
  },
},
{
  path: '/register',
  name: 'Register',
  component: register,
  meta: {
    title: '注册',
    hidden: true,
  },
},
{
  path: '/findback',
  name: 'FindBack',
  component: () => import('../views/layout/Findback.vue'),
  meta: {
    title: '找回密码',
    hidden: true,
  },
},
{
  path: '/changeuserinfo',
  name: 'changeUserInfo',
  component: () => import('../views/layout/ChangeUserInfo.vue'),
  meta: {
    title: '修改用户信息',
    hidden: true,
  },
},
];

export default routes;
