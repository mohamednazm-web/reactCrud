import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  CREATE_TOGGLE_SUCCESS,
} from "./actionTypes"

const initialState = {
  message: [{ status: "success", message: "message" }],
  network: false,
}

const users = (state = initialState, action) => {
  console.log(action.payload)
  switch (action.type) {
    case CREATE_TOGGLE_SUCCESS:
      return { ...state, network: !state.network }
    case CREATE_MESSAGE_SUCCESS:
      return {
        message: [...state.message, action.payload],
        network: state.network,
      }
    case CREATE_MESSAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        message: null,
        error: action.payload,
      }

    default:
      return state
  }
}

export default users
