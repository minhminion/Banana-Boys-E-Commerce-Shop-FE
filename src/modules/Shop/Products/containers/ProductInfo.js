import ProductInfo from '../components/ProductInfo';
import { connect } from 'react-redux';
import { multilanguage } from 'redux-multilanguage';
import handlers from '../handlers';

const mapStateToProps = (state, ownProps) => {

  return {
    currency: state.currencyData,
    cartItems: state.cart,
    wishlistItems: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return{
    ...handlers(dispatch,props)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(multilanguage(ProductInfo));