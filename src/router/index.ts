import { useUserStore } from './../store/user/user'
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
import { ElNotification } from 'element-plus'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
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

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (to.meta.requiresAut) {
    // 对于需要身份验证的页面，如果用户未经身份验证，则重定向到登录页面
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      const UserStore = useUserStore()
      try {
        await UserStore.userInfo()
        next()
      } catch (error: any) {
        await UserStore.logout()
        ElNotification({
          type: 'error',
          message: error.message,
          title: `登录失败`,
        })
        next('/login')
      }
    }
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
  nprogress.done()
})
export default router
