import * as types from './types';

import UserService from 'state/services/user.service';
import ProfileService from 'state/services/profile.service';

export const getProfile = (username, user) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    const res = await UserService.getProfile(username, user);

    dispatch({
      type: types.GET_PROFILE_SUCCESS,
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
  }
};

export const updateProfileMedia = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    const res = await ProfileService.update(id, data);

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
  }
};

export const exchangeContact = (profileId, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PROFILE_REQUEST,
    });
    const res = await UserService.exchangeContact(profileId, data);

    dispatch({
      type: types.EXCHANGE_CONTACT_SUCCESS,
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
  }
};
