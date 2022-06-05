import * as types from './types';

import TagService from '../../services/tag.service';

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
    localStorage.removeItem('tagId');
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.activate(id);

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
