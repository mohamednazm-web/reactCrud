import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Profile from "./auth/profile/reducer"

// USER
import users from "./shopping/user_crud/reducer"

// USER ADDRESS
import usersAddress from "./shopping/user_address/reducer"

import message from "./shopping/message/reducer"

import stockEntry from "./shopping/stockEntry/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Profile,
  usersList: users,
  userAddressList: usersAddress,
  message: message,
  stockEntry: stockEntry,
})

export default rootReducer
