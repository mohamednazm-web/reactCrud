import {
  GET_USER_ADDRESS_REQUEST,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_FAIL,
  CREATE_USER_ADDRESS_REQUEST,
  CREATE_USER_ADDRESS_SUCCESS,
  CREATE_USER_ADDRESS_FAIL,
  UPDATE_USER_ADDRESS_REQUEST,
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAIL,
  DELETE_USER_ADDRESS_REQUEST,
  DELETE_USER_ADDRESS_SUCCESS,
  DELETE_USER_ADDRESS_FAIL,
  GET_ONE_USER_ADDRESS_REQUEST,
  GET_ONE_USER_ADDRESS_SUCCESS,
  GET_ONE_USER_ADDRESS_FAIL,
} from "./actionTypes"

import * as api from "../../api/index.js"

export const oneUserAddress = id => async dispatch => {
  dispatch({ type: GET_ONE_USER_ADDRESS_REQUEST })
  try {
    const { data } = await api.getOneUserAddress(id)
    dispatch({ type: GET_ONE_USER_ADDRESS_SUCCESS, payload: data.userAddress })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: GET_ONE_USER_ADDRESS_FAIL, payload: error.message })
  }
}

export const listUserAddress = () => async dispatch => {
  dispatch({ type: GET_USER_ADDRESS_REQUEST })
  try {
    const { data } = await api.getAllUserAddress()
    console.log("listUserAddress", data)
    dispatch({ type: GET_USER_ADDRESS_SUCCESS, payload: data.userAddress })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: GET_USER_ADDRESS_FAIL, payload: error.message })
  }
}

export const createUserAddress = userAddress => async dispatch => {
  dispatch({ type: CREATE_USER_ADDRESS_REQUEST })
  try {
    const { data } = await api.createUserAddress(userAddress)
    console.log(data)
    dispatch({ type: CREATE_USER_ADDRESS_SUCCESS, payload: data.userAddress })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: CREATE_USER_ADDRESS_FAIL, payload: error.message })
  }
}

export const updateUserAddress = (id, newUserAddress) => async dispatch => {
  dispatch({ type: UPDATE_USER_ADDRESS_REQUEST })
  try {
    console.log("newUserAddress", newUserAddress)
    const { data } = await api.updateUserAddress(id, newUserAddress)
    console.log(data)
    // console.log(data)
    dispatch({ type: UPDATE_USER_ADDRESS_SUCCESS, payload: data.userAddress })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: UPDATE_USER_ADDRESS_FAIL, payload: error.message })
  }
}

export const deleteUserAddress = id => async dispatch => {
  dispatch({ type: DELETE_USER_ADDRESS_REQUEST })
  try {
    const { data } = await api.deleteUserAddress(id)
    console.log(data)
    dispatch({ type: DELETE_USER_ADDRESS_SUCCESS, payload: data })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: DELETE_USER_ADDRESS_FAIL, payload: error.message })
  }
}
