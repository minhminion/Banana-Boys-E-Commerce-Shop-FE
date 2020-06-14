import { notify, checkError } from "../../../libraries/Notify";
import {
  ADD_TO_WISHLIST,
  ADD_ALL_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  DELETE_ALL_FROM_WISHLIST,
} from "./actions";
import { fetchAuthLoading } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import { ENUMS } from "../../../constant";

export default (dispatch, props) => ({
  addToWishList: async (product) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.wishlistApi,
        method: "POST",
        data: {
          productTierId: product.productTiers[0].id,
        },
      });
      if (result && result.data && result.status === ENUMS.httpStatus.CREATED) {
        notify({
          message: "Đã thêm vào yêu thích",
          type: "success",
        });
        dispatch(ADD_TO_WISHLIST(result.data.data));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        checkError(error.response.data);
      } else {
        checkError("Vui lòng đăng nhập trước");
      }
    }
  },
  getAllWishList: async () => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.wishlistApi,
        method: "GET",
      });
      if (result && result.data && result.status === ENUMS.httpStatus.OK) {
        dispatch(ADD_ALL_TO_WISHLIST(result.data.data));
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  deleteFromWishList: async (wishListItem) => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.wishlistApiWithParams(wishListItem.id),
        method: "DELETE",
      });
      if (result && result.status === ENUMS.httpStatus.NO_CONTENT) {
        notify({
          message: "Đã xóa sản phẩm khỏi yêu thích",
          type: "success",
        });
        dispatch(DELETE_FROM_WISHLIST(wishListItem));
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        checkError(error.response.data.errors);
      } else {
        checkError("Server error !");
      }
    }
  },
  deleteAllFromWishList: async () => {
    try {
      const result = await fetchAuthLoading({
        url: ENDPOINTS.wishlistApi,
        method: "DELETE",
      });
      if (result && result.status === ENUMS.httpStatus.NO_CONTENT) {
        notify({
          message: "Đã xóa tất cả sản phẩm khỏi yêu thích",
          type: "success",
        });
        dispatch(DELETE_ALL_FROM_WISHLIST());
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
