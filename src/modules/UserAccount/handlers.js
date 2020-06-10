import { fetchAuthLoading } from "../../common/effects";
import { ENDPOINTS } from "./models";
import { address } from "../../constant";
import { setUserInformation } from "../LoginAndRegister/actions";

export default (dispatch, props) => ({
  getAllUserAddress: async (pageNumber, params) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getAllUserAddress,
        method: "GET",
        params: {
          pageNumber,
          ...params,
        },
      });
      return response;
    } catch (error) {}
  },
  createUserAddress: async (newAddress) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getAllUserAddress,
        method: "POST",
        data: {
          ...newAddress,
        },
      });
      return response;
    } catch (error) {}
  },
  getSingleUserAddress: async (addressId) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getSingleUserAddress(addressId),
        method: "GET",
      });
      return response;
    } catch (error) {}
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
      console.log("======== Bao Minh: error", error);
    }
  },
  changeInfoCustomer: async (customerId, data) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.changeInfoCustomer(customerId),
        method: "PUT",
        data: data,
      });
      console.log(response);
      return response;
    } catch (error) {}
  },
  getInfoCustomer: async (userId) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.getInfoCustomer(userId),
        method: "GET",
      });
      dispatch(setUserInformation(response.data.data));
      console.log(response);
      return response;
    } catch (error) {
      console.log("======== Tu Linh: error", error);
    }
  },
});
