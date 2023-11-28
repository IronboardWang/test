import { ResponseData } from './../../api/user/type'
import { reqLogin } from '@baseUrl/api/user'
import { SET_TOKEN, GET_TOKEN } from '@baseUrl/utils/token'
import { defineStore } from 'pinia'
import { userState } from './type'
export const useUserStore = defineStore('user', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
    }
  },
  actions: {
    async userLogin(username: string, password: string) {
      try {
        const loginData = { username, password }
        const response: ResponseData = await reqLogin(loginData)
        console.log(1111)

        if (response.code === 200) {
          const token = response.data.token
          SET_TOKEN(token)
          return Promise.resolve(response)
        } else {
          console.log(response)
          return Promise.reject(response)
        }
      } catch (error: any) {
        console.log(error)
        return Promise.reject(error)
      }
    },
  },
  getters: {},
})

export default useUserStore
