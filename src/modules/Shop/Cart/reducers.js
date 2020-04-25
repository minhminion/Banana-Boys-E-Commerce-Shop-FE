import { v4 as uuid } from 'uuid';
import * as actions from './actions'
import { handleActions } from "redux-actions";
import { clearAll } from "../../../common/redux/actions/common";

const addCard = (cartItems, product) => {
  const cartItem = cartItems.filter( item => item.id === product.id )[0]
  if (cartItem === undefined) {
    return [
      ...cartItems,
      {
        ...product,
        quantity: product.quantity ? product.quantity : 1,
        cartItemId: uuid()
      }
    ];
  } else {
    return cartItems.map(item =>
      item.cartItemId === cartItem.cartItemId
        ? {
            ...item,
            quantity: product.quantity
              ? item.quantity + product.quantity
              : item.quantity + 1
          }
        : item
    )
  }
}

const remainingItems = (cartItems, product) =>
  cartItems.filter(
    cartItem => cartItem.cartItemId !== product.cartItemId
);

const defaultState = [];

const handler = {
  [clearAll]: (state, action) => ([...defaultState]),
  [actions.addToCard]: (state, action) => (
    [...addCard(state, action.payload)]
  ),
  [actions.decreaseQuantity]: (state, action) => {
    if(action.payload.quantity === 1) {
      return [...remainingItems(state, action.payload)]
    } else {
      return state.map(item =>
        item.cartItemId === action.payload.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  },
  [actions.deleteFromCart]: (state, action) => (
    [...remainingItems(state, action.payload)]
  ),
  [actions.deleteAllFromCart]: (state, action) => ([...defaultState])
}

export default handleActions(handler, defaultState)

// const cartReducer = (state = defaultState, action) => {
//   const cartItems = state,
//     product = action.payload;

//   if (action.type === DECREASE_QUANTITY) {
//     if (product.quantity === 1) {
//       const remainingItems = (cartItems, product) =>
//         cartItems.filter(
//           cartItem => cartItem.cartItemId !== product.cartItemId
//         );
//       return remainingItems(cartItems, product);
//     } else {
//       return cartItems.map(item =>
//         item.cartItemId === product.cartItemId
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       );
//     }
//   }

//   if (action.type === DELETE_FROM_CART) {
//     const remainingItems = (cartItems, product) =>
//       cartItems.filter(cartItem => cartItem.cartItemId !== product.cartItemId);
//     return remainingItems(cartItems, product);
//   }

//   if (action.type === DELETE_ALL_FROM_CART) {
//     return cartItems.filter(item => {
//       return false;
//     });
//   }

//   return state;
// };

