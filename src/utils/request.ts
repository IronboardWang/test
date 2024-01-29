import { useUserStore } from './../store/user/user'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000 * 5,
})

// console.log(import.meta.env)
// console.log(import.meta.env.VITE_APP_BASE_API)

request.defaults.headers.post['Content-Type'] = 'application/json'

request.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const token = userStore.token
    // console.log(token)
    if (token) {
      config.headers.token = token
    }
    return config
  },
  error => Promise.reject(error),
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    return Promise.resolve(data)
  },
  (error: AxiosError) => {
    // const { response } = error
    ElMessage({
      type: 'error',
      message: 'error',
    })
    console.log(error)
    return Promise.reject(error)
  },
)

export default request
