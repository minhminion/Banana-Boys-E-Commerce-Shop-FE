
import { checkError } from "../../../libraries/Notify";
import { fetchAuthLoading } from "../../../common/effects";
import { ENDPOINTS } from "./models";

export default (dispatch, props) => ({
  createOrderProducts: async (data) => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.orderProducts,
        method: "POST",
        data
      });
      
        return response;
    } catch (error) {
      if (error.response && error.response.errors) {
        checkError(error.response.errors);
      } else {
        checkError("Server error !");
      }
    }
  }
});
