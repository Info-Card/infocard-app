import * as types from "./types";

import UserService from "../../../services/UserService";
import ProfileService from "../../../services/ProfileService";
import { toast } from "react-toastify";

export const getProfile = (username, user) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    const res = await UserService.getProfile(username, user);
    let profile = res.data.isPersonal ? res.data.personal : res.data.business;
    if (profile.isPrivate) {
      window.location = "/private-profile";
    } else {
      dispatch({
        type: types.GET_PROFILE_SUCCESS,
        payload: {
          user: res.data,
          profile,
        },
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PROFILE_FAIL,
      payload: message,
    });
  }
};

export const updateProfile = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    const res = await ProfileService.updateProfile(id, data);

    dispatch({
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PROFILE_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};

export const updateVideos = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    const res = await ProfileService.updateVideos(id, data);

    dispatch({
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PROFILE_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};

export const addCustomLink = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    const res = await ProfileService.addCustomLink(id, data);

    dispatch({
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PROFILE_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};

export const updateCustomLink =
  (profileId, linkId, data) => async (dispatch) => {
    try {
      dispatch({
        type: types.PROFILE_REQUEST,
      });
      const res = await ProfileService.updateCustomLink(
        profileId,
        linkId,
        data
      );

      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: types.PROFILE_FAIL,
        payload: message,
      });
      toast.error(message);
    }
  };

export const deleteCustomLink = (profileId, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    await ProfileService.deleteCustomLink(profileId, id);
    dispatch({
      type: types.UPDATE_PROFILE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PROFILE_FAIL,
      payload: message,
    });
    toast.error(message);
  }
};
