import request from '../../utils/request'
import { loginFormData, ResponseData } from './type'

enum API {
  LOGIN_URL = 'api/user/login',
  USERINFO_URL = 'api/user/info',
}

export const reqLogin = (data: loginFormData) => {
  return request.post<any, ResponseData>(API.LOGIN_URL, data)
}

export const reqUserInfo = () => {
  return request.get(API.USERINFO_URL)
}

// export const reqUserLogout = () => {
//   return request.get(API.USERINFO_URL)
// }
