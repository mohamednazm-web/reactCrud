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

const initialState = {
  isLoading: false,
  data: null,
  userAddress: [],
  usersAddress: [],
  loaded: false,
  error: null,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    // START user
    case CREATE_USER_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        data: null,
        error: null,
      }
    case CREATE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        usersAddress: action.payload,
        error: null,
      }
    case CREATE_USER_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: null,
        error: action.payload,
      }
    // END user
    // START GET ALL users
    case GET_ONE_USER_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        userAddress: [],
        error: null,
      }
    case GET_ONE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        userAddress: action.payload,
        error: null,
      }
    case GET_ONE_USER_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        userAddress: [],
        error: action.payload,
      }
    // END GET ALL users
    // START GET ALL users
    case GET_USER_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        usersAddress: [],
        error: null,
      }
    case GET_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        usersAddress: action.payload,
        error: null,
      }
    case GET_USER_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        usersAddress: [],
        error: action.payload,
      }
    // END GET ALL users
    // START UPDATE ONE user
    case UPDATE_USER_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: null,
      }
    case UPDATE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersAddress: action.payload,
        loaded: true,
        error: null,
      }
    case UPDATE_USER_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: action.payload,
      }
    // END UPDATE ONE user
    // START DELETE ONE user
    case DELETE_USER_ADDRESS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: null,
      }
    case DELETE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersAddress: state.usersAddress.filter(
          req => req.id != action.payload
        ),
        loaded: true,
        error: null,
      }
    case DELETE_USER_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: action.payload,
      }
    // END DELETE ONE user
    default:
      return state
  }
}

export default users
