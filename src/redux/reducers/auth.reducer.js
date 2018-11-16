import types from '../types/authTypes';

const initialState = {
  isLoggedIn: false,
  user: {}
}

export const authReducer = (state = initialState, action = {}) => {

  switch(action.type) {

    case types.LOGIN_REQUEST_FETCHING:
      return {...state, isFetching: true}

    case types.LOGIN_REQUEST_SUCCESS:
      return {...state, isFetching: false}

    case types.LOGIN_REQUEST_FAIL:
      return {...state, isFetching: false, error: action.payload}

    case types.SET_LOGIN_STATE:
      return {...state, isLoggedIn: true, user: action.payload}

    case types.REGISTER_REQUEST_FETCHING:
      return {...state, isFetching: true}

    case types.REGISTER_REQUEST_SUCCESS:
      return {...state, isFetching:false, isRegistered:true, data: action.payload}

    case types.REGISTER_REQUEST_FAIL:
      return {...state, isFetching:false, isRegistered:false, error: action.payload}

    case types.LOGOUT:
      return {...state, isLoggedIn: false}

    case 'GET_BACK_TO_INITSTATE':
      return {...state, error: null}

    default: return state
  }
}

export default authReducer;
