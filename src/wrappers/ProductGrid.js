import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import wishListHandler from '../modules/Shop/WishList/handlers'
import cartHandler from '../modules/Shop/Cart/handlers'
import ProductGridSingle from "../common/components/product/ProductGridSingle";
import handlers from "../modules/Shop/Products/handlers";

const ProductGrid = ({
  currency,
  addToCart,
  addToWishlist,
  cartItems,
  wishlistItems,
  sliderClassName,
  spaceBottomClass,
  getAllProducts
}) => {

  const [products, setProducts] = useState([])

  const fetchAllProducts = async (pageNumber = 1, params) => {
    const response = await getAllProducts(pageNumber, { pageSize: 6 });
    if (response && response.data) {
      setProducts(response.data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    return () => {
      
    }
  }, []);

  return (
    <Fragment>
      {products.map(product => {
        return (
          <ProductGridSingle
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
                wishlistItem => wishlistItem.id === product.id
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

const mapStateToProps = (state, ownProps) => {
  return {
    currency: state.currencyData,
    cartItems: state.cart,
    wishlistItems: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (item, quantityCount, cartId, tierId) => {
      cartHandler(dispatch, props).addToCart(item, quantityCount, cartId, tierId)
    },
    addToWishlist: (item) => {
      wishListHandler(dispatch, props).addToWishList(item)
    },
    getAllProducts: (pageNumber, params) => handlers(dispatch, props).getAllProducts(pageNumber, params)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
