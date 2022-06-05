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
  LOAD_DIR_FAILURE,
  LOAD_DIR_REQUEST,
  LOAD_DIR_SUCCESS,
  ADD_DIR_FAILURE,
  ADD_DIR_REQUEST,
  ADD_DIR_SUCCESS,
  UPDATE_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_DIR_FAILURE,
  UPDATE_DIR_REQUEST,
  UPDATE_DIR_SUCCESS,
  DELETE_DIR_FAILURE,
  DELETE_DIR_REQUEST,
  DELETE_DIR_SUCCESS,
} from "../reducers/directory";
import {
  LOAD_DIR_POST_FAILURE,
  LOAD_DIR_POST_REQUEST,
  LOAD_DIR_POST_SUCCESS,
} from "../reducers/post";

// 사용자 카테고리 불러오기
async function loadDirAPI() {
  return axios.get("/directory");
}

function* loadDir() {
  try {
    const result = yield call(loadDirAPI);

    yield put({
      type: LOAD_DIR_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_DIR_FAILURE,
      error: err.message,
    });
  }
}

function* watchLoadDir() {
  yield takeLatest(LOAD_DIR_REQUEST, loadDir);
}

// 카테고리 추가하기
async function addDirAPI(data) {
  return axios.post("/directory", data);
}

function* addDir(action) {
  try {
    const result = yield call(addDirAPI, action.data);

    yield put({
      type: ADD_DIR_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_DIR_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddDir() {
  yield takeLatest(ADD_DIR_REQUEST, addDir);
}

// 카테고리 순서 변경
async function updateOrderAPI(data) {
  return axios.patch("/directory/order", data);
}

function* updateOrder(action) {
  try {
    const result = yield call(updateOrderAPI, action.data);

    yield put({
      type: UPDATE_ORDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_ORDER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUpdateOrder() {
  yield takeEvery(UPDATE_ORDER_REQUEST, updateOrder);
}

// 카테고리 이름 변경
async function updateDirAPI(data) {
  return axios.patch("/directory", data);
}

function* updateDir(action) {
  try {
    const result = yield call(updateDirAPI, action.data);

    yield put({
      type: UPDATE_DIR_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_DIR_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUpdateDir() {
  yield takeLatest(UPDATE_DIR_REQUEST, updateDir);
}

// 카테고리 삭제
async function deleteDirAPI(data) {
  return axios.delete(`/directory/${data}`);
}

function* deleteDir(action) {
  try {
    const result = yield call(deleteDirAPI, action.data);

    yield put({
      type: DELETE_DIR_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_DIR_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDeleteDir() {
  yield takeLatest(DELETE_DIR_REQUEST, deleteDir);
}

// 특정 디렉토리 포스트 불러오기
async function loadDirPostAPI(data) {
  return axios.get(`/directory/${data}`);
}

function* loadDirPost(action) {
  try {
    const result = yield call(loadDirPostAPI, action.data);

    yield put({
      type: LOAD_DIR_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_DIR_POST_FAILURE,
      error: err.message,
    });
  }
}

function* watchLoadDirPost() {
  yield takeLatest(LOAD_DIR_POST_REQUEST, loadDirPost);
}

export default function* directorySaga() {
  yield all([
    fork(watchLoadDir),
    fork(watchAddDir),
    fork(watchUpdateOrder),
    fork(watchUpdateDir),
    fork(watchDeleteDir),
    fork(watchLoadDirPost),
  ]);
}
