import * as types from './types';

import TagService from '../../services/tag.service';

export const getTags = (user) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.getAll(user);

    dispatch({
      type: types.GET_TAGS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};

export const getTag = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.get(id);

    dispatch({
      type: types.GET_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};

export const activateTag = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.activate(id);
    localStorage.removeItem('tagId');
    dispatch({
      type: types.ACTIVATE_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};

export const updateTag = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.update(id, data);
    dispatch({
      type: types.UPDATE_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};

export const deleteTag = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.delete(id);
    dispatch({
      type: types.DELETE_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};
