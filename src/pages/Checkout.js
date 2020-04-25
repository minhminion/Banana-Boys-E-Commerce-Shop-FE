import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import MainLayoutShop from "../common/HOCS/MainLayoutShop"
import Breadcrumb from "../wrappers/Breadcrumb"
import { getDiscountPrice, defaultCurrency } from "../common/helpers/product"
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic"
import { Steps } from 'antd';
import BillDetails from '../common/components/checkout/BillDetails'
import YouOrder from "../common/components/checkout/YouOrder"

const { Step } = Steps;

const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location
  let cartTotalPrice = 0

  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Login',
      content: 'Login',
    },
    {
      title: 'Bill Details',
      content:
      <BillDetails
        cartItems={cartItems}
      />,
    },
    {
      title: 'Pay',
      content:
      <YouOrder
        cartItems={cartItems}
        getDiscountPrice={getDiscountPrice}
        defaultCurrency={defaultCurrency}
        currency={currency}
        cartTotalPrice={0}
      />,
    },
  ];

  const onChange = (current) => {
    console.log('======== Bao Minh: Checkout -> current', current)
    setCurrentStep(current)
  };

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
              <Steps current={currentStep} onChange={onChange}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
            <div className="checkout-content">{steps[currentStep].content}</div>
          </div>
        </div>
      </MainLayoutShop>
    </Fragment>
  )
}

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
    currency: state.currencyData
  }
}

export default connect(mapStateToProps)(Checkout)
