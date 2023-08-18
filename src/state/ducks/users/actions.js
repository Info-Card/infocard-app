import * as types from "./types";

import UserService from "../../../services/UserService";
import { toast } from "react-toastify";

export const getUsers = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.getAll(page, limit);

    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};

export const getUser = (id, query) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });

    const res = await UserService.get(id, query);

    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};

export const createUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.create(data);

    dispatch({
      type: types.CREATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.update(data);

    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};
