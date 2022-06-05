import * as types from './types';

const initialState = {};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.TAG_REQUEST:
      return {
        loading: true,
      };
    case types.TAG_FAIL:
      return {
        error: payload,
        loading: false,
      };
    case types.GET_TAG_SUCCESS:
      return {
        tag: payload,
      };
    case types.ACTIVATE_TAG_SUCCESS:
      return {
        success: true,
      };
    case types.TAG_RESET:
      return {};
    default:
      return state;
  }
}
