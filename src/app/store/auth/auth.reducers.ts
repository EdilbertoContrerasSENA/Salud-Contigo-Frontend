import { createReducer, on } from "@ngrx/store"
import { loginSuccess, logout } from "./auth.actions"

export const initialLogin = {
  isAuth: false,
  isAdmin: false,
  isDoctor: false,
  isPatient: false,
  user: undefined
}

const initialState = JSON.parse(sessionStorage.getItem('login') || JSON.stringify(initialLogin));

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { login }) => (
    {
      isAuth: true,
      isAdmin: login.isAdmin,
      isDoctor: login.isDoctor,
      isPatient: login.isPatient,
      user: login.user
    }
  )),
  on(logout, (state) => ({... initialLogin}))
)
