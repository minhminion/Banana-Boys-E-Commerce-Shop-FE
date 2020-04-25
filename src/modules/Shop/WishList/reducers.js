import * as actions from './actions'
import { handleActions } from "redux-actions";
import { clearAll } from '../../../common/redux/actions/common';

const updateWishList = (wishlistItems, product) => {
  const wishlistItem = wishlistItems.filter(
    item => item.id === product.id
  )[0]
  if (wishlistItem === undefined){
    return [...wishlistItems, product]
  } 
  return wishlistItems
}

const remainingItems = (wishlistItems, product) => {
  const wishlistItem = wishlistItems.filter(
    item => item.id !== product.id
  )

  return wishlistItem
}

const defaultState = [];

const handler = {
  [clearAll]: (state, action) => ([...defaultState]),
  [actions.ADD_TO_WISHLIST]: (state, action) => (
    [...updateWishList(state, action.payload)]
  ),
  [actions.DELETE_FROM_WISHLIST]: (state, action) => (
    [...remainingItems(state, action.payload)]
  ),
  [actions.DELETE_ALL_FROM_WISHLIST]: (state, action) => ([...defaultState])

}

export default handleActions(handler, defaultState)
