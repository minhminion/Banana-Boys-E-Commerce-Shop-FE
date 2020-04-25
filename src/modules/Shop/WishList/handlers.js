import { notify } from "../../../libraries/Notify"
import { ADD_TO_WISHLIST, DELETE_FROM_WISHLIST, DELETE_ALL_FROM_WISHLIST } from "./actions"

export default (dispatch, props) => ({
    addToWishList: (product) => {
      notify({
        message: 'Add to WishList',
        type: 'success'
      })
      dispatch(ADD_TO_WISHLIST(product))
    },
    deleteFromWishList: (product) => {
      notify({
        message: 'Delete from WishList',
        type: 'success'
      })
      dispatch(DELETE_FROM_WISHLIST(product))
    },
    deleteAllFromWishList: () => {
        notify({
            message: 'Delete ALL WishList',
            type: 'success'
          })
        dispatch(DELETE_ALL_FROM_WISHLIST())
    }
  })