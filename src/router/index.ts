import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layout/index.vue'),
      name: 'default',
    },
    {
      path: '/home',
      component: () => import('../layout/index.vue'),
      name: 'home',
      // children: [{}],
    },
    {
      path: '/login',
      component: () => import('../view/login/Index.vue'),
      name: 'login',
    },
    {
      path: '/404',
      component: () => import('../view/404/Index.vue'),
      name: '404',
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../view/404/Index.vue'),
      name: 'any',
    },
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
