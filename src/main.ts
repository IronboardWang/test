import { createApp } from 'vue'
import './style/index.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import allGlobalComponent from './components/GlobalComponent/index'
import router from './router/index'
import pinia from './store/index'

const app = createApp(App)

app.use(allGlobalComponent)
app.use(ElementPlus)
app.use(router)
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
