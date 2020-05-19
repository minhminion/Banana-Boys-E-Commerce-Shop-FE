import { fetch, fetchLoading } from "../../common/effects";
import { ENDPOINTS } from "./models";
import { setUserToken, setUserTokenExp, setUserInformation } from "./actions";
import { clearAll } from "../../common/redux/actions/common";

export default (dispatch, props) => ({
  loginAccount: async (userInfo) => {
    try {
      const result = await fetchLoading({
        url: ENDPOINTS.loginAccount,
        method: "POST",
        data: userInfo,
      });
      console.log(result)
      if (result.data && result.status === 200) {
        dispatch(setUserToken(result.data.token));
        dispatch(setUserTokenExp(result.data.exp));
        dispatch(setUserInformation(result.data.user));
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data };
      }
      return { success: false, error: { message: "Server error" } };
    }
  },
  registerAccount: async (newUserInfo) => {
    try {
      const response = await fetchLoading({
        url: ENDPOINTS.registerAccount,
        method: "POST",
        data: newUserInfo,
      });
      return response;
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data };
      }
      return { success: false, error: { message: "Server error" } };
    }
  },
  logoutAccount: () => {
    dispatch(clearAll())
  }
});
