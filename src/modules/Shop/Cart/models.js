import { DEFAULT_URL } from "../../../common/configs"

export const MODULE_NAME = 'cart'
export const ENDPOINTS = {
  cartDetails: `${DEFAULT_URL}/cartDetails`,
  cartDetailsAPI: (cartDetailsId) => `${DEFAULT_URL}/cartDetails/${cartDetailsId}`,
}

export const LIMIT = 20