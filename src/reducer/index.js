import { combineReducers } from "redux";
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from "../redux/action-types";
import storageUtils from "../utils/storage-utils";

/*管理 headTitle 状态数据的 reducer */
const initHeadTitle = "首页";
function headTitle(state = initHeadTitle, action) {
  console.log("headTitle()", state, action);
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data;
    default:
      return state;
  }
}
/*管理 user 状态数据的 reducer */
const initUser = storageUtils.getUser();
function user(state = initUser, action) {
  console.log("user()", state, action);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case SHOW_ERROR_MSG:
      return { ...state, errorMsg: action.errorMsg };
    case RESET_USER:
      return {};
    default:
      return state;
  }
}
export default combineReducers({ headTitle, user });
