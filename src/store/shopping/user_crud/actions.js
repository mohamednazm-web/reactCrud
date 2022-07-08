import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_ONE_USER_REQUEST,
  GET_ONE_USER_SUCCESS,
  GET_ONE_USER_FAIL,
} from "./actionTypes"

import * as api from "../../api/index.js"

export const oneUser = id => async dispatch => {
  dispatch({ type: GET_ONE_USER_REQUEST })
  try {
    const { data } = await api.getOneUser(id)
    dispatch({ type: GET_ONE_USER_SUCCESS, payload: data.earth })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: GET_ONE_USER_FAIL, payload: error.message })
  }
}

export const listUsers = () => async dispatch => {
  dispatch({ type: GET_USER_REQUEST })
  try {
    const { data } = await api.getAllUsers()
    console.log("listUsers", data)
    dispatch({ type: GET_USER_SUCCESS, payload: data.users })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: GET_USER_FAIL, payload: error.message })
  }
}

export const createUser = user => async dispatch => {
  dispatch({ type: CREATE_USER_REQUEST })
  try {
    const { data } = await api.createUser(user)
    console.log(data)
    dispatch({ type: CREATE_USER_SUCCESS, payload: data.users })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: CREATE_USER_FAIL, payload: error.message })
  }
}

export const updateUser = (id, newUser) => async dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST })
  try {
    console.log("newUser", newUser)
    const { data } = await api.updateUser(id, newUser)
    // console.log(data)
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.users })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: UPDATE_USER_FAIL, payload: error.message })
  }
}

export const deleteUser = id => async dispatch => {
  dispatch({ type: DELETE_USER_REQUEST })
  try {
    const { data } = await api.deleteUser(id)
    console.log(data)
    dispatch({ type: DELETE_USER_SUCCESS, payload: data })
  } catch (error) {
    // console.log(error.message)
    dispatch({ type: DELETE_USER_FAIL, payload: error.message })
  }
}
