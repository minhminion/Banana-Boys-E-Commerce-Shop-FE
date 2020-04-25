import { fetch, fetchLoading } from '../../common/effects'
import { ENDPOINTS } from './models'
import {
  setUserToken,
  setUserTokenExp,
  setUserInformation
} from './actions'
import { clearAll } from '../../common/redux/actions/common'

export default (dispatch, props) => ({
  registerAccount: async (newUserInfo) => {
    try {
      await fetch({
        url: ENDPOINTS.registerAccount,
        method: 'POST',
        data: newUserInfo
      })
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, error: { message: 'Server error' } }
    }
  },
  loginAccount: async (userInfo) => {
    try {
      const result = await fetchLoading({
        url: ENDPOINTS.loginAccount,
        method: 'POST',
        data: userInfo
      })
      if (result.data && result.status === 200) {
        dispatch(setUserToken(result.data.token))
        dispatch(setUserTokenExp(result.data.exp))
        dispatch(setUserInformation(result.data.user))
      }
    } catch (error) {
      if (error.response) {
        return { success: false, error: error.response.data }
      }
      return { success: false, error: { message: 'Server error' } }
    }
  },
  logoutAccount: () => {
    dispatch(clearAll())
  }
})
