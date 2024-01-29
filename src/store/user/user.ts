import { reqLogin, reqUserLogout } from './../../api/user/index'
import { REMOVE_TOKEN } from './../../utils/token'
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
          const token = response.data
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
      if (this.username === '') {
        const response = await reqUserInfo()
        // console.log(response)
        if (response.code === 200) {
          this.username = response.data.name
          this.avatar = response.data.avatar
          return Promise.resolve(response)
        } else {
          return Promise.reject(response)
        }
      }
    },
    async logout() {
      const result = await reqUserLogout()
      console.log(result)
      if (result.code === 200) {
        REMOVE_TOKEN()
        this.username = ''
        this.avatar = ''
        this.token = ''
        return Promise.resolve(result)
      } else {
        return Promise.reject(result)
      }
    },
  },
  getters: {},
})

export default useUserStore
