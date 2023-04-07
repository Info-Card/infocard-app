import * as types from "./types";
import AuthService from "../../../services/AuthService";
// import AuthService from '../../services/auth.service';

export const login = (creadentials) => (dispatch) => {
  dispatch({
    type: types.AUTH_REQUEST,
  });
  return AuthService.login(creadentials).then(
    (data) => {
      console.log("in auth action");
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: types.AUTH_FAIL,
        payload: message,
      });
    }
  );
};

export const register = (creadentials) => (dispatch) => {
  dispatch({
    type: types.AUTH_REQUEST,
  });
  return AuthService.register(creadentials).then(
    (data) => {
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: types.AUTH_FAIL,
        payload: message,
      });
    }
  );
};

export const forgotPassword = (email) => (dispatch) => {
  dispatch({
    type: types.AUTH_REQUEST,
  });
  return AuthService.forgotPassword(email).then(
    ({ data }) => {
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: types.AUTH_FAIL,
        payload: message,
      });
    }
  );
};

export const resetPassword = (token, password) => (dispatch) => {
  dispatch({
    type: types.AUTH_REQUEST,
  });
  return AuthService.resetPassword(token, password).then(
    ({ data }) => {
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: types.AUTH_FAIL,
        payload: message,
      });
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: types.LOGOUT,
  });
};

export const refreshToken = (tokens) => (dispatch) => {
  dispatch({
    type: types.REFRESH_TOKEN,
    payload: tokens,
  });
};
