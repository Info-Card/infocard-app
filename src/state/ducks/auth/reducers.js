import * as types from './types';

const authInfo = JSON.parse(localStorage.getItem('authInfo'));

const initialState = authInfo ? { ...authInfo } : {};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.AUTH_REQUEST:
      return {
        loading: true,
      };
    case types.AUTH_SUCCESS:
      return { ...payload, success: true };
    case types.AUTH_FAIL:
      return {
        error: payload,
      };
    case types.LOGOUT:
      return {};
    case types.REFRESH_TOKEN:
      return {
        ...state,
        ...authInfo,
        tokens: payload,
      };
    case types.AUTH_RESET:
      return {};
    default:
      return state;
  }
}
