import { DEFAULT_URL } from "../../common/configs";

export const MODULE_NAME = "user_account";
export const ENDPOINTS = {
  getAllUserAddress: `${DEFAULT_URL}/addresses`,
  getSingleUserAddress: (addressId) => `${DEFAULT_URL}/addresses/${addressId}`,
  changeInfoCustomer: (customerId) => `${DEFAULT_URL}/customers/${customerId}`,
  getInfoCustomer: (userId) => `${DEFAULT_URL}/users/${userId}`,
  changePassword: (userId) => `${DEFAULT_URL}/users/${userId}`,
};

export const LIMIT = 20;
