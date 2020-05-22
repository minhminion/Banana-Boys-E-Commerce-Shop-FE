import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import currencyHandler from '../../redux/actions/currency'
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";
import { multilanguage } from "redux-multilanguage";
import { defaultCurrency } from "../../helpers/product";

const HeaderTop = ({
  strings,
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch,
  borderStyle
}) => {
  return (
    <div
      className={`header-top-wap ${
        borderStyle === "fluid-border" ? "border-bottom" : ""
      }`}
    >
      <LanguageCurrencyChanger
        currency={currency}
        setCurrency={setCurrency}
        currentLanguageCode={currentLanguageCode}
        dispatch={dispatch}
      />
      <div className="header-offer">
        <p>
          {strings['free_delivery']}{" "}
          <span>  
            {defaultCurrency(currency, 200000 * currency.currencyRate)}
          </span>
        </p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  strings: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...currencyHandler(dispatch, props)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderTop));
