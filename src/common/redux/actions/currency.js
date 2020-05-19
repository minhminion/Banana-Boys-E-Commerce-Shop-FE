import { createAction } from "redux-actions";
import { fetch } from "../../effects";
export const SET_CURRENCY = createAction("SET_CURRENCY")

export default (dispatch, props) => ({
  setCurrency: async (currencyName) => {
    let currencyRate = 1;
    switch (currencyName) {
      case "USD":
        currencyRate = 0.000043
        break;
      case "EUR":
        currencyRate = 0.000035
        break;
      default: 
        break
    }
    dispatch(SET_CURRENCY({ currencyName, currencyRate }))
  },
})
