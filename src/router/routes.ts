export const constantRoute = [
  {
    path: '/',
    component: () => import('../layout/index.vue'),
    name: 'default',
    meta: { title: 'Default', hidden: false, requiresAuth: true },
    redirect: '/login',
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
    path: '/screen',
    component: () => import('../view/screen/Index.vue'),
    name: 'screen',
    meta: {
      hidden: false,
      title: 'Screen',
      icon: 'Monitor',
    },
  },
  {
    path: '/acl',
    component: () => import('../layout/index.vue'),
    name: 'acl',
    meta: {
      hidden: false,
      title: 'acl',
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('../view/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: 'user',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/role',
        component: () => import('../view/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: 'Role',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('../view/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: 'Permission',
          hidden: false,
          icon: 'Operation',
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
  {
    path: '/product',
    component: () => import('../layout/index.vue'),
    name: 'Product',
    meta: {
      hidden: false,
      title: 'Product',
      icon: 'Lock',
    },
    children: [
      {
        path: '/product/attr',
        component: () => import('../view/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: 'Attr',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/product/trademark',
        component: () => import('../view/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: 'Trademark',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/product/sku',
        component: () => import('../view/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'Sku',
          hidden: false,
          icon: 'Operation',
        },
      },
      {
        path: '/product/spu',
        component: () => import('../view/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'Spu',
          hidden: false,
          icon: 'Operation',
        },
      },
    ],
  },
]
