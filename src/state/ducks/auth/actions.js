import * as types from "./types";
import AuthService from "../../../services/AuthService";
import TokenService from "services/TokenService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_REQUEST,
    });
    const res = await AuthService.login(email, password);
    TokenService.setAuthInfo(res.data);
    dispatch({
      type: types.AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.AUTH_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};

export const registerUser = (creadentials) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_REQUEST,
    });
    const res = await AuthService.register(creadentials);
    TokenService.setAuthInfo(res.data);
    dispatch({
      type: types.AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.AUTH_FAIL,
      payload: message,
    });
    toast.error(message);
  }
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
      toast.error(message);
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
      toast.error(message);
    }
  );
};

export const logout = () => (dispatch) => {
  TokenService.removeAuthInfo();

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
