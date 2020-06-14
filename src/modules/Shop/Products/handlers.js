import { fetch, fetchLoading, fetchAuthLoading } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import { ENUMS } from "../../../constant";
import { checkError } from "../../../libraries/Notify";

export default (dispatch, props) => ({
  getCategories: async (params) => {
    try {
      const response = await fetchLoading({
        url: ENDPOINTS.getCategories,
        method: 'GET',
        ...params
      })
      if( response && response.data && response.status === ENUMS.httpStatus.OK) {
        return response.data
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Server error !");
      }
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
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Server error !");
      }
    }
  },
  getAllProducts: async (params) => {
    try {
      const response = await fetchLoading({
        url: ENDPOINTS.createProduct,
        method: 'GET',
        params: {
          pageNumber: 1,
          ...params,
        }
      })
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Server error !");
      }
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
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Server error !");
      }
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
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Server error !");
      }
    }
  },
  // ============ Rating ============
  createProductRates: async (data) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.productRates,
        method: "POST",
        data
      });
      
        return response;
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Server error !");
      }
    }
  },
  getAllProductRates: async (productId,params) => {
    try {
      const response = await fetchLoading({
        url: ENDPOINTS.productRates,
        method: "GET",
        params:{
          productId,
          ...params
        }
      });
      
        return response;
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          checkError(error.response.data.errors);
        } else {
          checkError(error.response.data);
        }
      } else {
        checkError("Server error !");
      }
    }
  }
})
