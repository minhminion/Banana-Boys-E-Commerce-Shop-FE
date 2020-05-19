import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import wishListHandler from '../modules/Shop/WishList/handlers'
import cartHandler from '../modules/Shop/Cart/handlers'
import ProductGridListSingle from "../common/components/product/ProductGridListSingle";

const ProductGrid = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  cartItems,
  wishlistItems,
  sliderClassName,
  spaceBottomClass,
}) => {
  return (
    <Fragment>
      {products.slice(0,9).map(product => {
        return (
          <ProductGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cartItem={
              cartItems.filter(cartItem => cartItem.id === product.id)[0]
            }
            wishlistItem={
              wishlistItems.filter(
                item => item.id === product.id
              )[0]
            }
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cart,
    wishlistItems: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (item, quantityCount) => {
      cartHandler(dispatch, props).addToCart(item, quantityCount)
    },
    addToWishlist: (item) => {
      wishListHandler(dispatch, props).addToWishList(item)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
