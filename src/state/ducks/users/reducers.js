import * as types from './types';

const initialState = {};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case types.GET_USERS_SUCCESS:
      return payload;
    case types.CREATE_USER_SUCCESS:
      return {
        success: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        success: true,
      };
    case types.GET_USER_SUCCESS:
      let profile = payload.isPersonal ? payload.personal : payload.business;
      return {
        user: payload,
        profile,
      };
    case types.USER_RESET:
      return {};
    default:
      return state;
  }
}
