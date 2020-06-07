import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";
import Checkout from "../components/Checkout";
import userHandlers from "../../../UserAccount/handlers";

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    cartItems: state.cart,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
      ...userHandlers(dispatch, props)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(Checkout));
