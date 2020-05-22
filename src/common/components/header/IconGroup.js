import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import cartHandlers from "../../../modules/Shop/Cart/handlers";
import userHandlers from "../../../modules/LoginAndRegister/handlers";
import { multilanguage } from "redux-multilanguage";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  deleteFromCart,
  iconWhiteClass,
  strings,
  user,
  signOut,
}) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const handleCart = (isOpen) => {
    const cartContent = document.querySelector(".shopping-cart-content");
    cartContent.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            {!user || !user.id ? (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    {strings["login"]}
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login-register"}>
                    {strings["register"]}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/user"}>
                    {strings["my_account"]}
                  </Link>
                </li>
                <li>
                  <Link onClick={() => signOut()} to={process.env.PUBLIC_URL}>
                    {strings["sign_out"]}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div
        className="same-style cart-wrap d-none d-lg-block"
      >
        <button className="icon-cart" onClick={(e) => handleCart(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          user={user}
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
  strings: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  return {
    user: state.user.user,
    currency: state.currencyData,
    cartData: state.cart,
    wishlistData: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    signOut: () => {
      userHandlers(dispatch, props).logoutAccount();
    },
    deleteFromCart: (item, cartId) => {
      cartHandlers(dispatch, props).deleteFromCart(item, cartId);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(IconGroup));
