import { DEFAULT_URL } from "../../../common/configs"


export const MODULE_NAME = 'product'
export const ENDPOINTS = {
  getCategories: `${DEFAULT_URL}/categories`,
  getSingleCategory:(categoryId) => `${DEFAULT_URL}/categories/${categoryId}`,
  createProduct: `${DEFAULT_URL}/products`,
  getSingleProduct: (productId) => `${DEFAULT_URL}/products/${productId}`,
  productRates: `${DEFAULT_URL}/rates`,
  productRatesWithParams:(ratingId) => `${DEFAULT_URL}/rates/${ratingId}`,
}

export const LIMIT = 20
