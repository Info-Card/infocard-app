import * as types from './types';

const initialState = {};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LINK_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case types.GET_LINKS_SUCCESS:
      return { categories: payload };
    case types.CREATE_LINK_SUCCESS:
      return {
        success: true,
      };
    case types.UPDATE_LINK_SUCCESS:
      return {
        success: true,
      };
    case types.UPDATE_SHARED_LINK_SUCCESS:
      return state;
    case types.DELETE_LINK_SUCCESS:
      return {
        success: true,
      };
    case types.GET_LINK_SUCCESS:
      let link = {};
      if (state.categories) {
        state.categories.forEach((category) => {
          category.platforms.forEach((platform) => {
            if (platform.platform === payload) {
              link = platform;
            }
          });
        });
      }
      return { ...state, link, loading: false };
    case types.LINK_RESET:
      return {};
    default:
      return state;
  }
}
