import * as types from "./types";

import TagService from "../../../services/TagService";
import { toast } from "react-toastify";
// import TagService from "../../services/tag.service";

export const getTags = () => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.getAll();

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
    toast.error(message);
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
    toast.error(message);
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
    toast.error(message);
  }
};

export const linkTag = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    await TagService.link(id);
    localStorage.removeItem("tagId");
    dispatch({
      type: types.LINK_TAG_SUCCESS,
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
    toast.error(message);
  }
};

export const unlinkTag = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    await TagService.unlink(id);
    dispatch({
      type: types.UNLINK_TAG_SUCCESS,
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
    toast.error(message);
  }
};
