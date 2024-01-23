import { ResponseData } from './../../api/user/type'
import { reqLogin, reqUserInfo } from '@baseUrl/api/user'
import { SET_TOKEN, GET_TOKEN } from '@baseUrl/utils/token'
import { defineStore } from 'pinia'
import { userState, LoginForm } from './type'
import { constantRoute } from '@baseUrl/router/routes'
export const useUserStore = defineStore('user', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(loginData: LoginForm) {
      try {
        const response: ResponseData = await reqLogin(loginData)

        if (response.code === 200) {
          const token = response.data.token
          SET_TOKEN(token)
          this.token = token
          return Promise.resolve(response)
        } else {
          // console.log(response)
          return Promise.reject(response)
        }
      } catch (error: any) {
        console.log(error)
        return Promise.reject(error)
      }
    },

    async userInfo() {
      const result = await reqUserInfo()
      console.log(result)
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        console.log(this.username)
      }
    },
    async logout() {
      this.username = ''
      this.avatar = ''
      this.token = null
    },
  },
  getters: {},
})

export default useUserStore
