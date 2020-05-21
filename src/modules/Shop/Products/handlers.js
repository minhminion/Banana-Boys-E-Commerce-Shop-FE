import { fetch, fetchLoading, fetchAuthLoading } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import { ENUMS } from "../../../constant";

export default (dispatch, props) => ({
  getCategories: async (params) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getCategories,
        method: 'GET',
        ...params
      })
      if( response && response.data && response.status === ENUMS.httpStatus.OK) {
        return response.data
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      console.log(error.response)
    }
  },
  createProduct: async (data) => {
    try {
      const response = await fetchLoading({
        url: ENDPOINTS.createProduct,
        method: 'POST',
        data: {
          ...data,
          storageId: 1,
          priceCurrency: 1,
        }
      })
      if( response && response.data && response.status === ENUMS.httpStatus.CREATED) {
        return response.data
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      console.log(error)
      return { success: false, error: { message: 'Server error' } }
    }
  },
  getAllProducts: async (pageNumber = 1, params) => {
    try {
      const response = await fetchLoading({
        url: ENDPOINTS.createProduct,
        method: 'GET',
        params: {
          ...params,
          // pageSize: 4,
          pageNumber,
        }
      })
      return response.data
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getSingleProduct: async (productId) => {
    try {
      const response = await fetchLoading({
        url: ENDPOINTS.getSingleProduct(productId),
        method: 'GET',
      })
      return response
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  },
  getSingleCategory: async (categoryId) => {
    try {
      const response = await fetchLoading({
        url: ENDPOINTS.getSingleCategory(categoryId),
        method: 'GET',
      })
      return response
    } catch (error) {
      return { success: false, message: 'Server Error' }
    }
  }
})
