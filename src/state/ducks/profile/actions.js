import * as types from './types';

import UserService from '../../services/user.service';

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
