import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProductCartQuantity,
  defaultCurrency,
} from "../../../common/helpers/product";
import Rating from "./sub-components/ProductRating";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import wishListHandler from "../../../modules/Shop/WishList/handlers";
import cartHandler from "../../../modules/Shop/Cart/handlers";
import { ENUMS } from "../../../constant";
import handlers from "../../../modules/Shop/Products/handlers";
import { multilanguage } from "redux-multilanguage";

const ProductDescriptionInfo = ({
  strings,
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  addToCart,
  addToWishlist,
  getSingleCategory,
}) => {
  const [quantityCount, setQuantityCount] = useState(1);
  const [productStock, setProductStock] = useState(product.quantity);
  const [category, setCategory] = useState({})

  const productCartQty = getProductCartQuantity(cartItems, product);

  const fetchSingleCategory = async (categoryId) => {
    const response = await getSingleCategory(categoryId)
    if(response && response.status === ENUMS.httpStatus.OK) {
      setCategory(response.data.data)
    }
  }

  useEffect(() => {
    fetchSingleCategory(product.categoryId)
  },[product])

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span className="old">
              {defaultCurrency(currency, finalProductPrice)}
            </span>
            <span>
            {`${defaultCurrency(currency, finalDiscountedPrice)} / ${
              ENUMS.ProductUnit.find((item) => item.id === product.productUnit)
                .content
            }`}
          </span>
          </Fragment>
        ) : (
          <span>
            {`${defaultCurrency(currency, finalProductPrice)} / ${
              ENUMS.ProductUnit.find((item) => item.id === product.productUnit)
                .content
            }`}
          </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating || 4} />
          </div>
        </div>
      ) : (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating || 4} />
          </div>
        </div>
      )}
      <div className="pro-details-list">
        <p>{product.description}</p>
      </div>
      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
            }
            className="dec qtybutton"
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() =>
              setQuantityCount(
                quantityCount < productStock - productCartQty
                  ? quantityCount + 1
                  : quantityCount
              )
            }
            className="inc qtybutton"
          >
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
          {productStock && productStock > 0 ? (
            <button
              onClick={() => addToCart(product, quantityCount)}
              disabled={productCartQty >= productStock}
            >
              {productCartQty >= productStock
              ? "Out of Stock"
              : strings['add_to_cart']}
            </button>
          ) : (
            <button disabled>Out of Stock</button>
          )}
        </div>
        <div className="pro-details-wishlist">
          <button
            disabled={wishlistItem !== undefined}
            title={
              wishlistItem !== undefined
                ? "Added to wishlist"
                : "Add to wishlist"
            }
            onClick={() => addToWishlist(product)}
          >
            {wishlistItem ? (
              <HeartFilled style={{ color: "#DC143C" }} />
            ) : (
              <HeartOutlined />
            )}
          </button>
        </div>
      </div>
      {product.categoryId ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>{category ? category.name : 'Không có loại'}</ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToCart: (item, quantityCount) => {
      cartHandler(dispatch, props).addToCart(item, quantityCount);
    },
    addToWishlist: (item) => {
      wishListHandler(dispatch, props).addToWishList(item);
    },
    getSingleCategory: (categoryId) => handlers(dispatch, props).getSingleCategory(categoryId)
  };
};

export default connect(null, mapDispatchToProps)(multilanguage(ProductDescriptionInfo));
