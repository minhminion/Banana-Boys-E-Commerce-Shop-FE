import { DEFAULT_URL } from '../../common/configs'

export const MODULE_NAME = 'user'
export const ENDPOINTS = {
  registerAccount: `${DEFAULT_URL}/register`,
  loginAccount: `${DEFAULT_URL}/login`,
  getUserInfo: (userId) => `${DEFAULT_URL}/users/${userId}`,
}

export const LIMIT = 20
