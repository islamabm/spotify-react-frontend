import { userService } from '../../services/user.service'
import {
  SIGNUP,
  SPEND_BALANCE,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
} from '../reducers/user.reducer'

export function doSignup(userCred) {
  console.log('userCred in the actions ', userCred)
  return async (dispatch, getState) => {
    try {
      const user = await userService.signup(userCred)
      const action = {
        type: SIGNUP,
        user,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function doLogin(userCred) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.login(userCred)
      const action = {
        type: LOGIN,
        user,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
export function doLogout() {
  return async (dispatch, getState) => {
    try {
      await userService.logout()
      const action = {
        type: LOGOUT,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function editUserImg(url) {
  return async (dispatch, getState) => {
    try {
      const user = await userService.updateUser(url)
      const action = {
        type: UPDATE_USER,
        user,
      }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}

export function spendBalance(amount) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SPEND_BALANCE, amount })
    } catch (error) {
      console.log('error:', error)
    }
  }
}
