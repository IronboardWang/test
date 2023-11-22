import axios, { AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // baseURL: 'http://localhost:8000/',
  timeout: 1000 * 5,
})
request.defaults.headers.post['Content-Type'] = 'application/json'

request.interceptors.request.use(
  config => {
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
