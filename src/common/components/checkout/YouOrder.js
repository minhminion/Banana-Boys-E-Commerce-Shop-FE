import React, { useState } from "react";
import { Col, Row, Typography, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const YouOrder = ({
  cartItems,
  defaultCurrency,
  getDiscountPrice,
  currency,
  cartTotalPrice,
}) => {
  const [paymentChoice, setPaymentChoice] = useState(null);

  const payments = [
    {
      id: "credit",
      content: "Thẻ tính dụng",
    },
    {
      id: "cod",
      content: "Thanh toán khi nhận hàng ( COD )",
    },
  ];

  return (
    <Row>
      <Col span={12}>
        <div className="checkout-payment">
          <Title level={3} style={{ marginBottom: 20 }}>
            Phương thức thanh toán
          </Title>
          <Space size="large">
            {payments.map((payment) => (
              <div
                className={`product-variation ${payment.id === paymentChoice ? 'active' : null}`}
                key={payment.id}
                onClick={() => setPaymentChoice(payment.id)}
              >
                {payment.content}
              </div>
            ))}
          </Space>
        </div>
      </Col>
      <Col span={12}>
        <div className="your-order-area">
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
                    );
                    const finalProductPrice =
                      cartItem.price * currency.currencyRate;
                    const finalDiscountedPrice =
                      discountedPrice * currency.currencyRate;

                    discountedPrice != null
                      ? (cartTotalPrice +=
                          finalDiscountedPrice * cartItem.quantity)
                      : (cartTotalPrice +=
                          finalProductPrice * cartItem.quantity);
                    return (
                      <li key={key}>
                        <span className="order-middle-left">
                          {cartItem.name} X {cartItem.quantity}
                        </span>{" "}
                        <span className="order-price">
                          {discountedPrice !== null
                            ? defaultCurrency(
                                currency,
                                finalDiscountedPrice * cartItem.quantity
                              )
                            : defaultCurrency(
                                currency,
                                finalProductPrice * cartItem.quantity
                              )}
                        </span>
                      </li>
                    );
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
                  <li>{defaultCurrency(currency, cartTotalPrice)}</li>
                </ul>
              </div>
            </div>
            <div className="payment-method"></div>
          </div>
          <div className="place-order mt-25">
            <button className="btn-hover">Place Order</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default YouOrder;
