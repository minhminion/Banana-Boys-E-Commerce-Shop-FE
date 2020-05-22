import Cart from "../components/Cart";
import { connect } from "react-redux";
import handlers from "../handlers";
import { multilanguage } from "redux-multilanguage";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...handlers(dispatch, props),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(Cart));
