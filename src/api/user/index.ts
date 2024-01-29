import request from '../../utils/request'
import { loginFormData, userInfoResponseData } from './type'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: loginFormData) => {
  return request.post(API.LOGIN_URL, data)
}

export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL)
}

export const reqUserLogout = () => {
  return request.post(API.LOGOUT_URL)
}
