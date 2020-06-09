import {
  addToCard,
  deleteFromCart,
  deleteAllFromCart,
  decreaseQuantity,
  addAllToCard,
} from "./actions";
import { notify, checkError } from "../../../libraries/Notify";
import { fetchLoading, fetchAuthLoading } from "../../../common/effects";
import { ENDPOINTS } from "./models";
import { ENUMS } from "../../../constant";

export default (dispatch, props) => ({
  getAllCartDetails: async () => {
    try {
      const response = await fetchAuthLoading({
        url: ENDPOINTS.cartDetails,
        method: "GET",
      });
      if (response && response.data && response.status === ENUMS.httpStatus.OK) {
        dispatch(addAllToCard(response.data.data))
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data };
      }
    }
  },
  addToCart: async (item, quantityCount, cartId,tierId) => {
    if (cartId) {
      try {
        const response = await fetchAuthLoading({
          url: ENDPOINTS.cartDetails,
          method: "POST",
          data: {
            quantity: quantityCount,
            cartId: cartId,
            productId: item.id,
            productTierId: tierId
          },
        });
        if (
          response &&
          response.data &&
          response.status === ENUMS.httpStatus.CREATED
        ) {
          notify({
            message: "Đã thêm sản phầm vào giỏ",
            type: "success",
          });
          dispatch(
            addToCard({
              cartItemId: response.data.data.id,
              // ...item,
              // if Response return product Images
              ...response.data.data.productTier,
              quantity: response.data.data.quantity,
            })
          );
          return response.data;
        }
      } catch (error) {
        checkError(error.response.errors);
      }
    } else {
      notify({
        message: "Vui lòng đăng nhập trước",
        type: "error",
      });
      // dispatch(
      //   addToCard({
      //     ...item,
      //     quantity: quantityCount,
      //   })
      // );
    }
  },
  decreaseQuantity: async (item, cartId) => {
    if (cartId) {
      try {
        const response = await fetchAuthLoading({
          url: ENDPOINTS.cartDetailsAPI(item.cartItemId),
          method: "PUT",
          data: {
            quantity: item.quantity - 1
          }
        });
        if (
          response &&
          response.data &&
          response.status === ENUMS.httpStatus.OK
        ) {
          notify({
            message: "Item Decremented From Cart",
            type: "warning",
          });
          dispatch(decreaseQuantity(item));
          return response.data;
        }
      } catch (error) {
        notify({
          message: "Số lượng sản phẩm ít nhất là 1 ",
          type: "error",
        });
      }
    } else {
      notify({
        message: "Item Decremented From Cart",
        type: "warning",
      });
      dispatch(decreaseQuantity(item));
    }
    
  },
  deleteFromCart: async (item, cartId) => {
    if (cartId) {
      try {
        const response = await fetchAuthLoading({
          url: ENDPOINTS.cartDetailsAPI(item.cartItemId),
          method: "DELETE",
        });
        if (
          response &&
          response.data &&
          response.status === ENUMS.httpStatus.OK
        ) {
          notify({
            message: "Xóa sản phẩm thành công",
            type: "success",
          });
          dispatch(deleteFromCart(item));
          return response.data;
        }
      } catch (error) {
        checkError(error.response.errors);
      }
    } else {
      notify({
        message: "Xóa sản phẩm thành công",
        type: "success",
      });
      dispatch(deleteFromCart(item));
    }
  },
  deleteAllFromCart: async (cartId) => {
    if (cartId) {
      try {
        const response = await fetchAuthLoading({
          url: ENDPOINTS.cartDetails,
          method: "DELETE",
        });
        if (
          response &&
          response.status === ENUMS.httpStatus.NO_CONTENT
        ) {
          notify({
            message: "Xóa giỏ hàng thành công",
            type: "success",
          });
          dispatch(deleteAllFromCart());
          return response.data;
        }
      } catch (error) {
        checkError(error.response.errors);
      }
    } else {
      notify({
        message: "Xóa giỏ hàng thành công",
        type: "success",
      });
      dispatch(deleteAllFromCart());
    }
  },
    
  cartItemStock: (item) => {
    if (item.stock) {
      return item.stock;
    }
  },
});
