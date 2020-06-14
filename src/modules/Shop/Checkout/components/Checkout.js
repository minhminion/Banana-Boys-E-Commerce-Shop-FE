import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import MainLayoutShop from "../../../../common/HOCS/MainLayoutShop";
import Breadcrumb from "../../../../wrappers/Breadcrumb";
import {
  getDiscountPrice,
  defaultCurrency,
} from "../../../../common/helpers/product";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Steps, Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import YouOrder from "./subComponents/YouOrder";
import BillDetails from "./subComponents/BillDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadingPage } from "../../../../common/hooks/useLoadingPage";

const { Step } = Steps;

const Checkout = ({
  history,
  location,
  cartItems,
  currency,
  user,
  getAllUserAddress,
  createUserAddress,
  createOrderProducts,
  getAllCartDetails,
  deleteSingleUserAddress
}) => {

  const stripePromise = loadStripe('pk_test_51GtRSgDISKi19aTGFSTEZ2s4LVU2QjME0SJxftn6f3crZetSY4x0fykPLBl2bfslQeiNkZyujuBv7dXaSZZ2pov700rNJalLgb');
  
  const { show, hide } = useLoadingPage();

  const { pathname } = location;

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 100)
  },[currentStep])

  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    user && user.id && setCurrentStep(1);
  }, [user]);

  const handleOnChangeOrderDetails = (data) => {
    setOrderDetails((prev) => ({ ...prev, ...data }));
  };

  const handleCreateOrderProducts = async (paymentId) => {
    show()
    const result = await createOrderProducts({
      ...orderDetails,
      paymentMethodId: paymentId,
    });
    hide()
    return result
  };

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
              style={{ margin: "auto" }}
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
          onSubmit={handleOnChangeOrderDetails}
          getAllUserAddress={getAllUserAddress}
          createUserAddress={createUserAddress}
          deleteSingleUserAddress={deleteSingleUserAddress}
          cartItems={cartItems}
        />
      ),
    },
    {
      title: "Pay",
      content: (
        <Elements stripe={stripePromise}>
        <YouOrder
          onSubmit={handleCreateOrderProducts}
          cartItems={cartItems}
          deleteSingleUserAddress={deleteSingleUserAddress}
          getDiscountPrice={getDiscountPrice}
          defaultCurrency={defaultCurrency}
          currency={currency}
          cartTotalPrice={0}
        />
        </Elements>
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
          <div className="container" style={{ width: 1500 }}>
            <div className="checkout-step">
              <Steps progressDot current={currentStep}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
            <div>{steps[currentStep].content}</div>
          </div>
        </div>
      </MainLayoutShop>
    </Fragment>
  );
};

export default Checkout;
