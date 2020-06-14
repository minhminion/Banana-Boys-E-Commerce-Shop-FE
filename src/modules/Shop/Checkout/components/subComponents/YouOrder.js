import React, { useState, useEffect } from "react";
import { Col, Row, Typography, Space, Input, message, Form } from "antd";
import { notify } from "../../../../../libraries/Notify";
import { ENUMS } from "../../../../../constant";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router";

const { Title, Text } = Typography;

const YouOrder = ({
  cartItems,
  defaultCurrency,
  onSubmit,
  currency,
  cartTotalPrice,
}) => {
  const [paymentChoice, setPaymentChoice] = useState(null);
  const [form] = Form.useForm();

  const history = useHistory();

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

  const handleCreateOrder = async () => {
    switch (paymentChoice) {
      case ENUMS.MethodOfPayment.BK:
        form.submit();
        break;
      case ENUMS.MethodOfPayment.COD:
        const result = await onSubmit(paymentChoice);
        if (
          result &&
          result.data &&
          result.status === ENUMS.httpStatus.CREATED
        ) {
          history.push("/orderSuccess");
        }
        break;
      default:
        message.warning("Vui lòng chọn phương thức thanh toán");
        break;
    }
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (values) => {
    // Block native form submission.

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("======== Bao Minh: error", error);
    } else {
      console.log(
        "======== Bao Minh: handleSubmit -> paymentMethod",
        paymentMethod
      );
    }

    try {
      if (error) {
        message.warning("Vui lòng kiểm tra lại mã thẻ");
      } else {
        const result = await onSubmit(paymentChoice);
        console.log('======== Bao Minh: result', result)
        if (paymentMethod && result) {
          const { paymentIntent } = await stripe.confirmCardPayment(
            result.data.data.stripeClientSecret,
            {
              payment_method: paymentMethod.id,
            }
          );

          console.log("======== Bao Minh: paymentIntent", paymentIntent);
          if (paymentIntent.status === "succeeded") {
            history.push("/orderSuccess");
          } else {
            notify({
              message: "Lỗi thanh toán",
              type: "error",
            });
          }
        } else {
          notify({
            message: "Lỗi thanh toán",
            type: "error",
          });
        }
      }
    } catch (error) {

      console.log('======== Bao Minh: error', error)
    }
  };

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
                className={`product-variation ${
                  payment.id === paymentChoice ? "active" : null
                }`}
                key={payment.id}
                onClick={() => setPaymentChoice(payment.id)}
              >
                {payment.content}
              </div>
            ))}
          </Space>
          {paymentChoice === ENUMS.MethodOfPayment.BK ? (
            <Form
              form={form}
              onFinish={handleSubmit}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              style={{ width: "80%", marginTop: 20 }}
            >
              <Form.Item label="Mã thẻ" extra="Ví dụ: 4000 0000 0000 3220">
                <div className="ant-input" style={{ padding: "10px 12px" }}>
                  <CardElement />
                </div>
              </Form.Item>
            </Form>
          ) : null}
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
                    const discountedPrice = cartItems.afterDiscountPrice;
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
                          {cartItems.discountPercentage > 0
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
            <button className="btn-hover" onClick={handleCreateOrder}>
              Thanh toán
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default YouOrder;
