import request from '@baseUrl/utils/request'
import { HasTrademarkRequest, TradeMarkResponseData, addTrademarkRequest } from './type'

enum API {
  BaseTrademark_URL = '/admin/product/baseTrademark/',
  AddTradeMark_URL = '/admin/product/baseTrademark/save/',
  UpdateTradeMark_URL = '/admin/product/baseTrademark/update/',
  DeleteTrademark_URL = '/admin/product/baseTrademark/remove/',
}

export const reqHasTrademark = (req: HasTrademarkRequest) => {
  return request.get<any, TradeMarkResponseData>(API.BaseTrademark_URL + `${req.page}/${req.limit}`)
}

export const reqAddTrademark = (req: addTrademarkRequest) => {
  return request.post<any, TradeMarkResponseData>(API.AddTradeMark_URL, req)
}

export const reqUpdateTrademark = (req: addTrademarkRequest) => {
  return request.put<any, TradeMarkResponseData>(API.UpdateTradeMark_URL, req)
}

export const reqDeleteTrademark = (req: any) => {
  console.log(req)

  return request.delete<any, TradeMarkResponseData>(API.DeleteTrademark_URL + req.id)
}
