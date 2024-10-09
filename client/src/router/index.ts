import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken && to.name === 'login') {
    return next({ name: 'home' });
  }

  if (to.meta.requiresAuth && !accessToken) {
    return next({ name: 'login' });
  }

  next();
})

export default router
