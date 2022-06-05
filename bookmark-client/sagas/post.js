import {
  all,
  call,
  fork,
  put,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_DIR_FAILURE,
  ADD_POST_DIR_REQUEST,
  ADD_POST_DIR_SUCCESS,
  ADD_REMOVE_FAV_POST_FAILURE,
  ADD_REMOVE_FAV_POST_REQUEST,
  ADD_REMOVE_FAV_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_FAV_POST_FAILURE,
  LOAD_FAV_POST_REQUEST,
  LOAD_FAV_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_DIR_SUCCESS } from "../reducers/directory";

// 모든 포스트 불러오기
async function loadPostAPI() {
  return axios.get("/post");
}

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.message,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

// 포스트 추가
async function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.message,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// 포스트와 디렉토리 동시 추가
async function addPostDirAPI(data) {
  return axios.post("/post/directory", data);
}

function* addPostDir(action) {
  try {
    const result = yield call(addPostDirAPI, action.data);

    yield put({
      type: ADD_POST_DIR_SUCCESS,
    });

    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data.newPost,
    });

    yield put({
      type: ADD_DIR_SUCCESS,
      data: result.data.newDir,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_DIR_FAILURE,
      error: err.message,
    });
  }
}

function* watchAddPostDir() {
  yield takeLatest(ADD_POST_DIR_REQUEST, addPostDir);
}

// 포스트 삭제
async function deletePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.data);

    yield put({
      type: DELETE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_POST_FAILURE,
      error: err.message,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(DELETE_POST_REQUEST, deletePost);
}

// 포스트 즐겨찾기 추가
async function addRemoveFavPostAPI(data) {
  return axios.patch("/post/fav", data);
}

function* addRemoveFavPost(action) {
  try {
    const result = yield call(addRemoveFavPostAPI, action.data);

    yield put({
      type: ADD_REMOVE_FAV_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_REMOVE_FAV_POST_FAILURE,
      error: err.message,
    });
  }
}

function* watchAddRemoveFavPost() {
  yield takeLatest(ADD_REMOVE_FAV_POST_REQUEST, addRemoveFavPost);
}

// 즐겨찾기 포스트 불러오기
async function loadFavPostAPI() {
  return axios.get(`/post/favorite`);
}

function* loadFavPost() {
  try {
    const result = yield call(loadFavPostAPI);

    yield put({
      type: LOAD_FAV_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FAV_POST_FAILURE,
      error: err.message,
    });
  }
}

function* watchLoadFavPost() {
  yield takeLatest(LOAD_FAV_POST_REQUEST, loadFavPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddPostDir),
    fork(watchLoadPost),
    fork(watchLoadFavPost),
    fork(watchAddRemoveFavPost),
    fork(watchDeletePost),
  ]);
}
