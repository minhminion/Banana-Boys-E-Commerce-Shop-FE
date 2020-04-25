import { addToCard, deleteFromCart, deleteAllFromCart, decreaseQuantity } from "./actions"
import { notify } from "../../../libraries/Notify"

export default (dispatch, props) => ({
  addToCart: (item, quantityCount) => {
    notify({
      message: 'Added to Cart',
      type: 'success'
    })
    dispatch(addToCard({
      ...item,
      quantity: quantityCount,
    }))
  },
  decreaseQuantity: (item) => {
    notify({
      message: 'Item Decremented From Cart',
      type: 'warning'
    })
    dispatch(decreaseQuantity(item))
  },
  deleteFromCart: (item) => {
    notify({
      message: 'Delete from Cart',
      type: 'success'
    })
    dispatch(deleteFromCart(item))
  },
  deleteAllFromCart: () => {
    notify({
      message: 'Delete all from Cart',
      type: 'success'
    })
    dispatch(deleteAllFromCart())
  },
  cartItemStock: (item) => {
    if (item.stock) {
      return item.stock;
    } 
  }
})