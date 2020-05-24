import { DEFAULT_URL } from "../../common/configs";

export const MODULE_NAME = "user_account";
export const ENDPOINTS = {
  getAllUserAddress: `${DEFAULT_URL}/addresses`,
  getSingleUserAddress: (addressId) => `${DEFAULT_URL}/addresses/${addressId}`
};

export const LIMIT = 20;
