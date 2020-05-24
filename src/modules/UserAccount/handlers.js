import { fetchAuthLoading } from "../../common/effects";
import { ENDPOINTS } from "./models";
import { address } from "../../constant";


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
      console.log('======== Bao Minh: error', error)
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
      console.log('======== Bao Minh: error', error)
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
      console.log('======== Bao Minh: error', error)
    }
  },
  editSingleUserAddress: async (addressId, data) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getSingleUserAddress(addressId),
        method: "PUT",
        data: data
      }) 
      return response
    } catch (error) {
      console.log('======== Bao Minh: error', error)
    }
  }
});
