import axios from 'axios';
import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, SIGNUP_ERROR, SIGNUP_SUCCESS } from './types';

const API_URL = "http://localhost:3000/api/v1/users";
const headers = {
  'Content-Type': 'multipart/form-data',
}

export const login = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
  },
});

export const loginError = (err) => ({
  type: LOGIN_ERROR,
  payload: {
    err,
  },
});

export const register = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: {
    user,
  },
});

export const registerError = (err) => ({
  type: SIGNUP_ERROR,
  payload: {
    err,
  },
});

export const logout = () => ({
  type: LOGOUT,
});

export const userlogin = (user) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${API_URL}/login`, user);
        dispatch(login(response.data));
        localStorage.setItem("currentUser", JSON.stringify(response.data))
        localStorage.setItem("token", JSON.stringify(response.data.token))
      } catch (error) {
        dispatch(loginError(error.response.data.msg))
      }
   };
};

export const registerUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/register`, user, {headers: headers});
      dispatch(register(response.data));
    } catch (error) {
      dispatch(registerError(error.response.data.msg))
    }
 };
};