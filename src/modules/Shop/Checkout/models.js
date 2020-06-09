import { DEFAULT_URL } from "../../../common/configs"

export const MODULE_NAME = 'order'
export const ENDPOINTS = {
  orderProducts: `${DEFAULT_URL}/Orders`,
  orderProductsWithParams:(orderId) => `${DEFAULT_URL}/Orders/${orderId}`
}

export const LIMIT = 20