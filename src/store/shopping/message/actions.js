import {
  CREATE_MESSAGE_REQUEST,
  CREATE_TOGGLE_SUCCESS,
  CREATE_TOGGLE_FAIL,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
} from "./actionTypes"

import * as api from "../../api/index.js"

export const createMessage = message => async dispatch => {
  try {
    console.log(message)
    const { data } = await api.createMessage(message)
    console.log(data)
    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: CREATE_MESSAGE_FAIL, payload: error.message })
  }
}

export const network = () => async dispatch => {
  try {
    dispatch({ type: CREATE_TOGGLE_SUCCESS })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: CREATE_TOGGLE_FAIL, payload: error.message })
  }
}
