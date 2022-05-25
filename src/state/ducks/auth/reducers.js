import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.AUTH_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.AUTH_RESET:
      return {};
    default:
      return state;
  }
};
