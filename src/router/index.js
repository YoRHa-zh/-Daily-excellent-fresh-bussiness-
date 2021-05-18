import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store';
import Home from '../views/layout/Home.vue';
import getMenuRouter from '../utils/permission';

Vue.use(VueRouter);

const asyncRoutes = [{
  path: '/product',
  name: 'Product',
  component: Home,
  meta: {
    title: '商品',
    icon: 'shopping',
    hidden: false,
  },
  children: [{
    name: 'ProductList',
    path: 'productlist',
    component: () => import('../views/pages/ProductList.vue'),
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
      hidden: false,
    },
  },
  {
    name: 'ProductAdd',
    path: 'productadd',
    component: () => import('../views/pages/ProductAdd.vue'),
    meta: {
      title: '添加商品',
      icon: 'file-add',
      hidden: false,
    },
  },
  {
    name: 'ProductEdit',
    path: 'edit/:id',
    component: () => import('../views/pages/ProductAdd.vue'),
    meta: {
      title: '编辑商品',
      icon: 'file-add',
      hidden: true,
    },
  },
  {
    name: 'Category',
    path: 'category',
    component: () => import('../views/pages/Category.vue'),
    meta: {
      title: '商品类目',
      icon: 'cluster',
      hidden: false,
    },
  },
  {
    name: 'CategoryAdd',
    path: 'categoryadd',
    component: () => import('../views/pages/CategoryAdd.vue'),
    meta: {
      title: '商品类目新增',
      icon: 'cluster',
      hidden: true,
    },
  },
  {
    name: 'CategoryEdit',
    path: 'categoryedit',
    component: () => import('../views/pages/CategoryAdd.vue'),
    meta: {
      title: '商品类目修改',
      icon: 'cluster',
      hidden: true,
    },
  },
  ],
}];
const router = new VueRouter({
  routes,
});
let isAdd = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (to.path === '/register' || to.path === '/findback') {
      return next();
    }
    if (store.state.user.username && store.state.user.email
          && store.state.user.appkey && store.state.user.role) {
      const menuRoutes = getMenuRouter(store.state.user.role, asyncRoutes);
      if (!isAdd) {
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAdd = true;
      }

      return next();
    }
    return next('/login');
  }

  return next();
});
export default router;
