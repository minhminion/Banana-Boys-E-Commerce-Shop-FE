import { DEFAULT_URL } from '../../common/configs'

export const MODULE_NAME = 'user'
export const ENDPOINTS = {
  registerAccount: `${DEFAULT_URL}/auth/signup`,
  loginAccount: `${DEFAULT_URL}/auth/login`
}

export const LIMIT = 20
