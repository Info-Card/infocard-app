import * as types from './types';

import UserService from '../../services/user.service';

export const getUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.get(username);

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
  }
};
