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
  },
  children: [
    {
      name: 'ProductList',
      path: 'productlist',
      component: () => import('../views/pages/ProductList.vue'),
      meta: {
        title: '商品列表',
      },
    },
    {
      name: 'ProductAdd',
      path: 'productadd',
      component: () => import('../views/pages/ProductAdd.vue'),
      meta: {
        title: '添加商品',
      },
    },
    {
      name: 'Category',
      path: 'category',
      component: () => import('../views/pages/Category.vue'),
      meta: {
        title: '商品类目',
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
    if (store.state.user.username && store.state.user.email
      && store.state.user.appkey && store.state.user.role) {
      const menuRoutes = getMenuRouter(store.state.user.role, asyncRoutes);
      if (!isAdd) {
        router.addRoutes(menuRoutes);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes));
        isAdd = true;
      }

      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
