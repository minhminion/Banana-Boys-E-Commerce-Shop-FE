import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import {
  getDiscountPrice,
  defaultCurrency,
} from "../../../../common/helpers/product";
import MainLayoutShop from "../../../../common/HOCS/MainLayoutShop";
import Breadcrumb from "../../../../wrappers/Breadcrumb";
import { HeartOutlined } from "@ant-design/icons";
import { multilanguage } from "redux-multilanguage";
import { useSelector } from "react-redux";
import { DEFAULT_IMG_URL } from "../../../../common/configs";

const Wishlist = ({
  location,
  cartItems,
  currency,
  addToCart,
  wishlistItems,
  deleteFromWishList,
  deleteAllFromWishList,
  strings,
  history,
}) => {
  const { pathname } = location;

  const cartId = useSelector((state) =>
    state.user.user && state.user.user.customer
      ? state.user.user.customer.cart.id
      : null
  );

  if (!cartId) {
    history.push("/login-register");
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | {strings["wishlist"]}</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {strings["home"]}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {strings["wishlist"]}
      </BreadcrumbsItem>

      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlistItems && wishlistItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">
                  {strings["you_wishlist_items"]}
                </h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>{strings["image"]}</th>
                            <th>{strings["product_name"]}</th>
                            <th>{strings["unit_price"]}</th>
                            <th>{strings["add_to_cart"]}</th>
                            <th>{strings["action"]}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistItems.map((wishlistItem, key) => {
                            const cartItem = cartItems.filter(
                              (item) => item.id === wishlistItem.productTierId
                            )[0];
                            const product = wishlistItem.productTier.product;
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      product.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        product.productImages &&
                                        product.productImages.length
                                          ? DEFAULT_IMG_URL +
                                            product.productImages[0].imgLocation.replace(
                                              "\\",
                                              "/"
                                            )
                                          : process.env.PUBLIC_URL +
                                            "/img/products/3.jpg"
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      product.id
                                    }
                                  >
                                    {product.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {wishlistItem.productTier &&
                                  wishlistItem.productTier.discountPercentage >
                                    0 ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {defaultCurrency(
                                          currency,
                                          wishlistItem.productTier.salePrice
                                        )}
                                      </span>
                                      <span className="amount">
                                        {defaultCurrency(
                                          currency,
                                          wishlistItem.productTier
                                            .afterDiscountPrice
                                        )}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {defaultCurrency(
                                        currency,
                                        wishlistItem.productTier
                                          .afterDiscountPrice
                                      )}
                                    </span>
                                  )}
                                </td>

                                <td className="product-wishlist-cart">
                                  {wishlistItem.productTier &&
                                  wishlistItem.productTier.quantity &&
                                  wishlistItem.productTier.quantity > 0 ? (
                                    <button
                                      onClick={() =>
                                        addToCart(
                                          wishlistItem,
                                          1,
                                          cartId,
                                          wishlistItem.productTierId
                                        )
                                      }
                                      className={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                          ? "active"
                                          : ""
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                      }
                                      title={
                                        wishlistItem !== undefined
                                          ? "Added to cart"
                                          : strings["add_to_cart"]
                                      }
                                    >
                                      {cartItem !== undefined &&
                                      cartItem.quantity > 0
                                        ? strings["added_to_cart"]
                                        : strings["add_to_cart"]}
                                    </button>
                                  ) : (
                                    <button disabled className="active">
                                      {strings["out_of_stock"]}
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromWishList(wishlistItem)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/shop"}>
                          {strings["continue_shopping"]}
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromWishList()}>
                          {strings["clear_wishlist"]}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <HeartOutlined />
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Add Items
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayoutShop>
    </Fragment>
  );
};

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishList: PropTypes.func,
  deleteFromWishList: PropTypes.func,
  wishlistItems: PropTypes.array,
};

export default Wishlist;
