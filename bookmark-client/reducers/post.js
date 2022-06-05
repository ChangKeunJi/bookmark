import produce from "immer";
import { updateArr } from "../hooks/helper";

const initialState = {
  allPosts: [],
  dirPosts: [],
  favPosts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addPostDirLoading: false,
  addPostDirDone: false,
  addPostDirError: null,
  addRemoveFavPostLoading: false,
  addRemoveFavPostDone: false,
  addRemoveFavPostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadDirPostLoading: false,
  loadDirPostDone: false,
  loadDirPostError: null,
  loadFavPostLoading: false,
  loadFavPostDone: false,
  loadFavPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_POST_DIR_REQUEST = "ADD_POST_DIR_REQUEST";
export const ADD_POST_DIR_SUCCESS = "ADD_POST_DIR_SUCCESS";
export const ADD_POST_DIR_FAILURE = "ADD_POST_DIR_FAILURE";

export const ADD_REMOVE_FAV_POST_REQUEST = "ADD_REMOVE_FAV_POST_REQUEST";
export const ADD_REMOVE_FAV_POST_SUCCESS = "ADD_REMOVE_FAV_POST_SUCCESS";
export const ADD_REMOVE_FAV_POST_FAILURE = "ADD_REMOVE_FAV_POST_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const LOAD_DIR_POST_REQUEST = "LOAD_DIR_POST_REQUEST";
export const LOAD_DIR_POST_SUCCESS = "LOAD_DIR_POST_SUCCESS";
export const LOAD_DIR_POST_FAILURE = "LOAD_DIR_POST_FAILURE";

export const LOAD_FAV_POST_REQUEST = "LOAD_FAV_POST_REQUEST";
export const LOAD_FAV_POST_SUCCESS = "LOAD_FAV_POST_SUCCESS";
export const LOAD_FAV_POST_FAILURE = "LOAD_FAV_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const AFTER_ADD_POST = "AFTER_ADD_POST";
export const AFTER_ADD_POST_FAIL = "AFTER_ADD_POST_FAIL";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.allPosts = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        draft.allDirs = null;
      case LOAD_DIR_POST_REQUEST:
        draft.loadDirPostLoading = true;
        draft.loadDirPostDone = false;
        draft.loadDirPostError = null;
        break;
      case LOAD_DIR_POST_SUCCESS:
        draft.loadDirPostLoading = false;
        draft.loadDirPostDone = true;
        draft.dirPosts = action.data;
        break;
      case LOAD_DIR_POST_FAILURE:
        draft.loadDirPostLoading = false;
        draft.loadDirPostError = action.error;
        draft.dirPosts = null;
      case LOAD_FAV_POST_REQUEST:
        draft.loadFavPostLoading = true;
        draft.loadFavPostDone = false;
        draft.loadFavPostError = null;
        break;
      case LOAD_FAV_POST_SUCCESS:
        draft.loadFavPostLoading = false;
        draft.loadFavPostDone = true;
        draft.favPosts = action.data;
        break;
      case LOAD_FAV_POST_FAILURE:
        draft.loadFavPostLoading = false;
        draft.loadFavPostError = action.error;
        draft.favPosts = null;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.allPosts.unshift(action.data);
        if (action.data.DirectoryId) {
          draft.dirPosts.unshift(action.data);
        }
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case ADD_POST_DIR_REQUEST:
        draft.addPostDirLoading = true;
        draft.addPostDirDone = false;
        draft.addPostDirError = null;
        break;
      case ADD_POST_DIR_SUCCESS:
        draft.addPostDirLoading = false;
        draft.addPostDirDone = true;
        break;
      case ADD_POST_DIR_FAILURE:
        draft.addPostDirLoading = false;
        draft.addPostDirError = action.error;
        break;
      case ADD_REMOVE_FAV_POST_REQUEST:
        draft.addRemoveFavPostLoading = true;
        draft.addRemoveFavPostDone = false;
        draft.addRemoveFavPostError = null;
        break;
      case ADD_REMOVE_FAV_POST_SUCCESS:
        draft.addRemoveFavPostLoading = false;
        draft.addRemoveFavPostDone = true;
        draft.allPosts = updateArr(draft.allPosts, action.data);
        if (!action.data.favorite) {
          draft.favPosts = draft.favPosts.filter(
            (el) => el.id !== action.data.id,
          );
        }
        break;
      case ADD_REMOVE_FAV_POST_FAILURE:
        draft.addRemoveFavPostLoading = false;
        draft.addRemoveFavPostError = action.error;
        break;
      case DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;
      case DELETE_POST_SUCCESS:
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        draft.allPosts = draft.allPosts.filter((el) => el.id !== action.data);
        draft.dirPosts = draft.dirPosts?.filter((el) => el.id !== action.data);
        draft.favPosts = draft.favPosts?.filter((el) => el.id !== action.data);
        break;
      case DELETE_POST_FAILURE:
        draft.deletePostLoading = false;
        draft.deletePostError = action.error;
      case AFTER_ADD_POST:
        draft.addPostDone = false;
        break;
      case AFTER_ADD_POST_FAIL:
        draft.addPostError = false;
        break;
      default:
        break;
    }
  });
};

export default reducer;
