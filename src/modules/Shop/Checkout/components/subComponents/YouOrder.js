import React, { useState } from "react";
import { Col, Row, Typography, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { notify } from "../../../../../libraries/Notify";
import { ENUMS } from "../../../../../constant";

const { Title, Text } = Typography;

const YouOrder = ({
  cartItems,
  defaultCurrency,
  onSubmit,
  currency,
  cartTotalPrice,
}) => {
  const [paymentChoice, setPaymentChoice] = useState(null);

  const payments = [
    {
      id: ENUMS.MethodOfPayment.BK,
      content: "Thẻ tín dụng",
    },
    {
      id: ENUMS.MethodOfPayment.COD,
      content: "Thanh toán khi nhận hàng ( COD )",
    },
  ];

  const handleCreateOrder = () => {
    if(paymentChoice === null) {
      notify({
        message: 'Vui lòng chọn phương thức thanh toán',
        type: 'warning'
      })
    } else {
      onSubmit(paymentChoice)
    }
  }

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
                  <li>Sản phẩm</li>
                  <li>Tổng tiền</li>
                </ul>
              </div>
              <div className="your-order-middle">
                <ul>
                  {cartItems.map((cartItem, key) => {
                    const discountedPrice = cartItems.afterDiscountPrice
                    const finalProductPrice =
                      cartItem.salePrice * currency.currencyRate;
                    const finalDiscountedPrice =
                      discountedPrice * currency.currencyRate;

                    cartItems.discountPercentage > 0
                      ? (cartTotalPrice +=
                          finalDiscountedPrice * cartItem.quantity)
                      : (cartTotalPrice +=
                          finalProductPrice * cartItem.quantity);
                    return (
                      <li key={key}>
                        <span className="order-middle-left">
                          {cartItem.product.name} X {cartItem.quantity}
                        </span>{" "}
                        <span className="order-price">
                          { cartItems.discountPercentage > 0
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
                  <li className="your-order-shipping">Vận chuyển</li>
                  <li>Miễn phí</li>
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
            <button className="btn-hover" onClick={handleCreateOrder}>Thanh toán</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default YouOrder;
