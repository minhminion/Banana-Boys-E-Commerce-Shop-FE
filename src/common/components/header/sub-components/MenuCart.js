import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { defaultCurrency } from "../../../helpers/product";
import { multilanguage } from "redux-multilanguage";
import { DEFAULT_IMG_URL } from "../../../configs";

const MenuCart = ({ cartData, currency, deleteFromCart, strings, user }) => {
  let cartTotalPrice = 0;

  const cartId = user && user.customer ? user.customer.cart.id : null

  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
            console.log('======== Bao Minh: MenuCart -> single', single)
              // const discountedPrice = getDiscountPrice(
              //   single.price,
              //   single.discount
              // );
              const discountedPrice = single.salePrice
              const finalProductPrice = (
                single.price * currency.currencyRate
              );
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              );

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.id}>
                      <img
                        alt=""
                        src={single.productImages && single.productImages.length
                          ? DEFAULT_IMG_URL + single.productImages[0].imgLocation.replace("\\", "/")
                          : process.env.PUBLIC_URL + "/img/products/3.jpg"}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + single.id}
                      >
                        {" "}
                        {single.name}{" "}
                      </Link>
                    </h4>
                    <h6>Số lượng: {single.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? defaultCurrency(currency,finalDiscountedPrice)
                        : defaultCurrency(currency, finalProductPrice)}
                    </span>
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single, cartId)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              {strings['total']} :{" "}
              <span className="shop-total">
                {defaultCurrency(currency, cartTotalPrice)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              {strings['view_cart']}
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              {strings['checkout']}
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
  strings: PropTypes.object
};

export default multilanguage(MenuCart);
