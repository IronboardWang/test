export const constantRoute = [
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    name: 'default',
    meta: { title: 'Default', hidden: false, requiresAuth: true },
    children: [
      {
        path: '/home',
        component: () => import('../view/home/Index.vue'),
        name: 'home',
        meta: {
          title: 'Home',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../view/login/Index.vue'),
    name: 'login',
    meta: { title: 'Login', hidden: true },
  },
  {
    path: '/404',
    component: () => import('../view/404/Index.vue'),
    name: '404',
    meta: { title: '404', hidden: true },
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../view/404/Index.vue'),
    name: 'any',
    meta: { title: 'any', hidden: true },
  },
]
