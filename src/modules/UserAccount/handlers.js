import { fetchAuthLoading } from "../../common/effects";
import { ENDPOINTS } from "./models";
import { address } from "../../constant";
import { setUserInformation } from "../LoginAndRegister/actions";
import { ENUMS } from "../../constant";
import checkError from "../../libraries/CheckError";


export default (dispatch, props) => ({
  getAllUserAddress: async (pageNumber, params) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getAllUserAddress,
        method: "GET",
        params: {
          pageNumber,
          ...params
        }
      }) 
      return response
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  createUserAddress: async (newAddress) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getAllUserAddress,
        method: "POST",
        data: {
          ...newAddress
        }
      }) 
      return response
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  getSingleUserAddress: async (addressId) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getSingleUserAddress(addressId),
        method: "GET",
      }) 
      return response
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  editSingleUserAddress: async (addressId, data) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getSingleUserAddress(addressId),
        method: "PUT",
        data: data,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  changeInfoCustomer: async (customerId, data) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.changeInfoCustomer(customerId),
        method: "PUT",
        data: data,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  getInfoCustomer: async (userId) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getInfoCustomer(userId),
        method: "GET",
      });
      dispatch(setUserInformation(response.data.data));
      console.log(response);
    } catch (error) {
    }
  },
  changePassword: async (userId, data) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.changePassword(userId),
        method: "PUT",
        data: data,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  deleteSingleUserAddress: async (addressId) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getSingleUserAddress(addressId),
        method: "DELETE",
      }) 
      return response
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  getAllOrderDetails: async (params) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.orderDetails,
        method: "GET",
        params: {
          pageNumber: 1,
          ...params,
        },
      });
      if (result && result.data && result.status === ENUMS.httpStatus.OK) {
        return result.data;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  getSingleOrderDetails: async (orderId) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.orderDetailsWithParams(orderId),
        method: "GET",
      });
      if (result && result.data && result.status === ENUMS.httpStatus.OK) {
        return result.data;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
});
