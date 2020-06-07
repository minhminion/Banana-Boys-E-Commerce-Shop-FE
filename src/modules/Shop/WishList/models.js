import { DEFAULT_URL } from "../../../common/configs"
export const MODULE_NAME = 'wishlist'

export const ENDPOINTS = {
  wishlistApi: `${DEFAULT_URL}/productFavors`,
  wishlistApiWithParams: (productFavorId) => `${DEFAULT_URL}/productFavors/${productFavorId}`
}

export const LIMIT = 20