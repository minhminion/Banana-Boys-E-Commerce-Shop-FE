import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { clearAll } from '../../common/redux/actions/common'
import { setCookie } from '../../common/utils/cookie';

export const defaultState = {
  token: null,
  exp: null,
  // THiS is MOCK EXAMPLE FOR USER API 
  user: {}
}

const handlers = {
  [clearAll]: (state, action) => {
    setCookie('user', '')
    setCookie('token', '')
    setCookie('exp', '')
    return { ...defaultState };
  },
  [actions.setUserInformation]: (state, action) => {
    setCookie("user", JSON.stringify(action.payload));
    return {
      ...state,
      user: action.payload,
    };
  },
  [actions.setUserToken]: (state, action) => {
    setCookie("token", action.payload);
    return {
      ...state,
      token: action.payload,
    };
  },
  [actions.setUserTokenExp]: (state, action) => {
    setCookie("exp", action.payload);
    return {
      ...state,
      exp: action.payload,
    };
  },
};

export default handleActions(handlers, defaultState)
