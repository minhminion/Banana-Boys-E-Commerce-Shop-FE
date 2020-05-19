import * as actions from "../actions/currency";
import { clearAll } from "../actions/common";
import { handleActions } from "redux-actions";

const defaultState = {
  currencySymbol: "VND",
  currencyName: "VND",
  currencyRate: 1
};

const updateCurrency = (currency) => {
  const currencyName = currency.currencyName
  switch (currency.currencyName) {
    case 'USD':
      return {
        currencySymbol: "$",
        currencyRate: currency.currencyRate,
        currencyName
      }
    case 'EUR':
      return {
        currencySymbol: "€",
        currencyRate: currency.currencyRate,
        currencyName
      }
    case 'VND':
      return {
        currencySymbol: "VND",
        currencyRate: currency.currencyRate,
        currencyName
      }
    default: 
      return null
  }
}

const handlers = {
  [clearAll]: (state, action) => ({ ...defaultState }),
  [actions.SET_CURRENCY]: ( state, action ) => ({
    ...state,
    ...updateCurrency(action.payload)
  })
}

export default handleActions(handlers, defaultState)


