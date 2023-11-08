import { SET_USERS, ADD_USER, DELETE_USER, UPDATE_USER, GET_USER, API_ERROR, RESET } from '../actions/types';

const initialState = {
  users: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        error: null
      };
    case RESET:
      return {
        ...state,
        users: [],
        error: null
      };
    case API_ERROR:
      return {
        ...state,
        users: [],
        error: action.payload
      };
    case GET_USER:
      return {
        ...state,
        users: action.payload,
    };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case UPDATE_USER:
      const updatedUser = action.payload;
      return {
        ...state,
        users: state.users.map(user => (user.id === updatedUser.id ? updatedUser : user)),
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;