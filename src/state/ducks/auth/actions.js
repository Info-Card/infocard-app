import * as types from './types';

import AuthService from '../../services/auth.service';

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_REQUEST,
    });
    const res = await AuthService.resetPassword(token, password);

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
  }
};
