import request from '@baseUrl/utils/request'
import { HasTrademarkRequest, TradeMarkResponseData } from './type'

enum API {
  BaseTrademark_URL = '/admin/product/baseTrademark/',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqHasTrademark = (req: HasTrademarkRequest) => {
  return request.get<any, TradeMarkResponseData>(API.BaseTrademark_URL + `${req.page}/${req.limit}`)
}
