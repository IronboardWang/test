import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
import { GET_TOKEN } from '@baseUrl/utils/token'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

function isUserAuthenticated() {
  const isAuthenticated = GET_TOKEN()
  return isAuthenticated === 'Admin Token'
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    // 对于需要身份验证的页面，如果用户未经身份验证，则重定向到登录页面
    next('/login')
  } else {
    next()
  }
})
export default router
