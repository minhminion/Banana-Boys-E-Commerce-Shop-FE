import { fetch, fetchLoading } from "../../common/effects";
import { ENDPOINTS } from "./models";
import { setUserToken, setUserTokenExp, setUserInformation, setUserRefreshToken } from "./actions";
import { clearAll } from "../../common/redux/actions/common";
import { ENUMS } from "../../constant";

export default (dispatch, props) => ({
  loginAccount: async (userInfo) => {
    try {
      const result = await fetchLoading({
        url: ENDPOINTS.loginAccount,
        method: "POST",
        data: userInfo,
      });
      console.log(result);
      if (
        result.data &&
        result.status === 200 &&
        result.data.user.roleId === ENUMS.RoleNameEnum.Customer
      ) {
        dispatch(setUserToken(result.data.token));
        dispatch(setUserRefreshToken(result.data.refreshToken));
        dispatch(setUserTokenExp(result.data.exp));
        dispatch(setUserInformation(result.data.user));
      } else {
        return {
          success: false,
          error: { errors: "Tài khoản không khả dụng" },
        };
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
    dispatch(clearAll());
  },
});
