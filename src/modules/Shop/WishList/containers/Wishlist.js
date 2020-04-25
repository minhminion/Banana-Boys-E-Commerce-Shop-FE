import { connect } from "react-redux"
import handlers from "../handlers"
import cartHandlers from "../../Cart/handlers"
import Wishlist from "../components/Wishlist"
import { multilanguage } from "redux-multilanguage"

const mapStateToProps = state => {
    return {
      cartItems: state.cart,
      wishlistItems: state.wishlist,
      currency: state.currencyData
    }
  }
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      addToCart: cartHandlers(dispatch,props).addToCart,
      ...handlers(dispatch, props)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Wishlist))