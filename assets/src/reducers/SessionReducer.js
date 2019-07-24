import { combineReducers } from 'redux';

import {
  LOGIN_STARTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_STARTED,
  LOGOUT_SUCCEEDED,
  LOGOUT_FAILED,
  SIGN_UP_STARTED,
  SIGN_UP_SUCCEEDED,
  SIGN_UP_FAILED,
  GET_SESSION_DATA_STARTED,
  GET_SESSION_DATA_SUCCEEDED,
  GET_SESSION_DATA_FAILED,
} from '../actions/auth/SessionActions';

const defaultState = {
  isLoading: false,
  error: '',
  isLoadingPermissions: false,
};

const login = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case LOGIN_STARTED:
      newState = {
        isLoading: true,
        error: '',
      };
      return newState;
    case LOGIN_SUCCEEDED:
      newState = {
        isLoading: false,
        error: '',
      };
      return newState;
    case LOGIN_FAILED:
      newState = {
        isLoading: false,
        error: action.error.status,
      };
      return newState;
    default:
      return state;
  }
};

const signUp = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case SIGN_UP_STARTED:
      newState = {
        isLoading: true,
        error: '',
      };
      return newState;
    case SIGN_UP_SUCCEEDED:
      newState = {
        isLoading: false,
        error: '',
      };
      return newState;
    case SIGN_UP_FAILED:
      newState = {
        isLoading: false,
        error: action.error.status,
      };
      return newState;
    default:
      return state;
  }
};

const data = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case GET_SESSION_DATA_STARTED:
      newState = {
        isLoading: true,
        error: '',
      };
      return newState;
    case GET_SESSION_DATA_SUCCEEDED: {
      newState = Object.assign({ isLoading: false }, action.reponse.data);
      return newState;
    }
    case GET_SESSION_DATA_FAILED:
      newState = {
        isLoading: false,
        error: action.error.status,
      };
      return newState;
    default:
      return state;
  }
};

const logout = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case LOGOUT_STARTED:
      newState = {
        isLoading: true,
        error: '',
      };
      return newState;
    case LOGOUT_SUCCEEDED:
      newState = {
        isLoading: false,
        error: '',
      };
      return newState;
    case LOGOUT_FAILED:
      newState = {
        isLoading: false,
        error: action.error.status,
      };
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  login,
  signUp,
  logout,
  data,
});
