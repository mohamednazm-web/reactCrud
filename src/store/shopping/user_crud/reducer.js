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

const initialState = {
  isLoading: false,
  data: null,
  user: [],
  users: [],
  loaded: false,
  error: null,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    // START user
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        data: null,
        error: null,
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        users: action.payload,
        error: null,
      }
    case CREATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: null,
        error: action.payload,
      }
    // END user
    // START GET ALL users
    case GET_ONE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        user: [],
        error: null,
      }
    case GET_ONE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        user: action.payload,
        error: null,
      }
    case GET_ONE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        user: [],
        error: action.payload,
      }
    // END GET ALL users
    // START GET ALL users
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        users: [],
        error: null,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        users: action.payload,
        error: null,
      }
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        users: [],
        error: action.payload,
      }
    // END GET ALL users
    // START UPDATE ONE user
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: null,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        loaded: true,
        error: null,
      }
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: action.payload,
      }
    // END UPDATE ONE user
    // START DELETE ONE user
    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: null,
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users.filter(req => req.id != action.payload),
        loaded: true,
        error: null,
      }
    case DELETE_USER_FAIL:
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
