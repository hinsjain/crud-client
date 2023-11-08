import { SET_USERS, ADD_USER, DELETE_USER, UPDATE_USER, GET_USER, API_ERROR, RESET } from './types';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/users";

const token = JSON.parse(localStorage.getItem('token'))
const headers= {
  'authorization': `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
};

// Action Creators
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const setUsersError = (users) => ({
  type: API_ERROR,
  payload: users,
});

export const getUser = (userId) => ({
    type: GET_USER,
    payload: userId,
  });

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addUserError = (user) => ({
  type: API_ERROR,
  payload: user,
});

export const updateUserError = (user) => ({
  type: API_ERROR,
  payload: user,
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const reset = () => ({
  type: RESET,
});

// Async Actions
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL, {headers: headers})
      dispatch(setUsers(response.data));
    } catch (error) {
      dispatch(setUsersError(error.response.data.msg))
    }
  };
};

export const fetchUser = (userId) => {
    return async (dispatch) => {
      try {
        await axios.get(`${API_URL}/${userId}`);
        dispatch(getUser(userId));
      } catch (error) {
        console.log(error);
      }
    };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/register`, user, {headers: headers});
      dispatch(addUser(response.data));
    } catch (error) {
      dispatch(addUserError(error.response.data.msg))
      console.log(error);
    }
  };
};

export const resetState = () => {
  return async (dispatch) => {
    try {
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/${userId}`, {headers: headers});
      dispatch(deleteUser(userId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const modifyUser = (user, id) => {
  return async (dispatch) => {
    try {
      console.log(user)
      const response = await axios.put(`${API_URL}/${id}`, user, {headers: headers});
      console.log(response)
      dispatch(updateUser(response.data));
    } catch (error) {
      dispatch(updateUserError(error.response.data.msg))
      console.log(error);
    }
  };
};