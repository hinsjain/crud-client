import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, SIGNUP_ERROR, SIGNUP_SUCCESS } from '../actions/types';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loginError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loginError: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loginError: action.payload
      };
      case SIGNUP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loginError: null
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loginError: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loginError: null
      };
    default:
      return state;
  }
};

export default authReducer;