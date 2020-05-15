import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import MainLayoutShop from "../common/HOCS/MainLayoutShop";
import Breadcrumb from "../wrappers/Breadcrumb";
import { getDiscountPrice, defaultCurrency } from "../common/helpers/product";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Steps, Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import BillDetails from "../common/components/checkout/BillDetails";
import YouOrder from "../common/components/checkout/YouOrder";

const { Step } = Steps;

const Checkout = ({ history, location, cartItems, currency, user }) => {
  const { pathname } = location;

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    user && user.id && setCurrentStep(1);
  }, [user]);

  const steps = [
    {
      title: "Login",
      content: (
        <Result
          icon={<SmileOutlined />}
          title="Vui lòng đăng nhập để tiếp tục thanh toán !"
          extra={
            <Button
              className="button"
              type="primary"
              style={{ margin: 'auto' }}
              onClick={() =>
                history.push(process.env.PUBLIC_URL + "/login-register")
              }
            >
              Đăng nhập
            </Button>
          }
        />
      ),
    },
    {
      title: "Bill Details",
      content: (
        <BillDetails
          goNext={() => setCurrentStep(2)}
          user={user}
          cartItems={cartItems}
        />
      ),
    },
    {
      title: "Pay",
      content: (
        <YouOrder
          cartItems={cartItems}
          getDiscountPrice={getDiscountPrice}
          defaultCurrency={defaultCurrency}
          currency={currency}
          cartTotalPrice={0}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | Checkout</title>
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + " "}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <MainLayoutShop headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            <div className="checkout-step">
              <Steps progressDot current={currentStep}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
            <div className="checkout-content">{steps[currentStep].content}</div>
          </div>
        </div>
      </MainLayoutShop>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    cartItems: state.cart,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
