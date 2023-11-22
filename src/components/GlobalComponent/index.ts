import SvgIcon from './SvgIcon.vue'

const allGlobalComponent: any = { SvgIcon }

export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach(key => {
      //注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
  },
}
