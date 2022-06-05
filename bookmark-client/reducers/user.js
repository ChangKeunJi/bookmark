import produce from "immer";

export const initialState = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  copyLinkPopup: false,
  deletePopup: false,
  addFavPopup: false,
  deleteFavPopup: false,
  addPostPopup: false,
  addPostFailPopup: false,
  me: {},
};

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const COPY_LINK_POPUP = "COPY_LINK_POPUP";
export const DELETE_POPUP = "DELETE_POPUP";
export const ADD_FAVORITE_POPUP = "ADD_FAVORITE_POPUP";
export const ADD_POST_POPUP = "ADD_POST_POPUP";
export const ADD_POST_FAIL_POPUP = "ADD_POST_FAIL_POPUP";
export const DELETE_FAVORITE_POPUP = "DELETE_FAVORITE_POPUP";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case COPY_LINK_POPUP:
        draft.copyLinkPopup = action.data;
        break;
      case DELETE_POPUP:
        draft.deletePopup = action.data;
        break;
      case ADD_FAVORITE_POPUP:
        draft.addFavPopup = action.data;
        break;
      case ADD_POST_POPUP:
        draft.addPostPopup = action.data;
        break;
      case ADD_POST_FAIL_POPUP:
        draft.addPostFailPopup = action.data;
        break;
      case DELETE_FAVORITE_POPUP:
        draft.deleteFavPopup = action.data;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        draft.me = null;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.data;
        break;
      default:
        break;
    }
  });
};

export default reducer;
