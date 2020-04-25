import React from 'react'

const YouOrder = ({
  cartItems,
  defaultCurrency,
  getDiscountPrice,
  currency,
  cartTotalPrice
}) => {
  return (
    <div className="your-order-area">
      <h3>Your order</h3>
      <div className="your-order-wrap gray-bg-4">
        <div className="your-order-product-info">
          <div className="your-order-top">
            <ul>
              <li>Product</li>
              <li>Total</li>
            </ul>
          </div>
          <div className="your-order-middle">
            <ul>
              {cartItems.map((cartItem, key) => {
                const discountedPrice = getDiscountPrice(
                  cartItem.price,
                  cartItem.discount
                )
                const finalProductPrice = (
                  cartItem.price * currency.currencyRate
                )
                const finalDiscountedPrice = (
                  discountedPrice * currency.currencyRate
                )

                discountedPrice != null
                  ? (cartTotalPrice +=
                    finalDiscountedPrice * cartItem.quantity)
                  : (cartTotalPrice +=
                    finalProductPrice * cartItem.quantity)
                return (
                  <li key={key}>
                    <span className="order-middle-left">
                      {cartItem.name} X {cartItem.quantity}
                    </span>{" "}
                    <span className="order-price">
                      {discountedPrice !== null
                        ? defaultCurrency(currency, finalDiscountedPrice * cartItem.quantity)
                        : defaultCurrency(currency, finalProductPrice * cartItem.quantity)
                      }
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="your-order-bottom">
            <ul>
              <li className="your-order-shipping">Shipping</li>
              <li>Free shipping</li>
            </ul>
          </div>
          <div className="your-order-total">
            <ul>
              <li className="order-total">Total</li>
              <li>
                {defaultCurrency(currency, cartTotalPrice)}
              </li>
            </ul>
          </div>
        </div>
        <div className="payment-method"></div>
      </div>
      <div className="place-order mt-25">
        <button className="btn-hover">Place Order</button>
      </div>
    </div>
  )
}

export default YouOrder
