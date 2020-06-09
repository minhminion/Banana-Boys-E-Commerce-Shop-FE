import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";
import Checkout from "../components/Checkout";
import userHandlers from "../../../UserAccount/handlers";
import cartHandlers from "../../Cart/handlers";
import handlers from "../handlers";

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    cartItems: state.cart,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
      ...cartHandlers(dispatch, props),
      ...handlers(dispatch, props),
      ...userHandlers(dispatch, props)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(Checkout));
