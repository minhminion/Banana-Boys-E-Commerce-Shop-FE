import { createAction } from "redux-actions";
import { fetch } from "../../effects";
export const SET_CURRENCY = createAction("SET_CURRENCY")

export default (dispatch, props) => ({
  setCurrency: async (currencyName) => {
    try {
      const result = await fetch({
        url: 'https://api.exchangeratesapi.io/latest?base=USD',
        method: 'GET',
      })
      if (result.data && result.status === 200) {
        const rates = result.data.rates;
        let currencyRate = 0;
        if( currencyName === 'VND' ) {
          currencyRate = 20000;
        } else {
          for (const rate in rates) {
            if (rate === currencyName) {
              currencyRate = rates[rate];
            }
          }
        }
        dispatch(SET_CURRENCY({ currencyName, currencyRate }))
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, error: { message: 'Server error' } }
    }
  },
})
