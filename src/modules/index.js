// MODULE NAMES
import { MODULE_NAME as MODULE_USER } from './user/models'
import { MODULE_NAME as MODULE_WISHLIST } from './Shop/WishList/models'
import { MODULE_NAME as MODULE_CART } from './Shop/Cart/models'

// MODULE REDUCERS
import userReducers from './user/reducers'
import wishListReducers from './Shop/WishList/reducers'
import cartReducers from './Shop/Cart/reducers'

export const MODULE_SAGAS = [

]

export const MODULE_REDUCERS = {
  [MODULE_CART]: cartReducers,
  [MODULE_WISHLIST]: wishListReducers,
  [MODULE_USER]: userReducers,
}