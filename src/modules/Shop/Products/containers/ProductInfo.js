import ProductInfo from '../components/ProductInfo';
import { connect } from 'react-redux';
import { multilanguage } from 'redux-multilanguage';

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  const products = require('../../../../data/products.json')

  return {
    product: products.find(product => itemId === product.id),
    currency: state.currencyData,
    cartItems: state.cart,
    wishlistItems: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return{}
}

export default connect(mapStateToProps,mapDispatchToProps)(multilanguage(ProductInfo));