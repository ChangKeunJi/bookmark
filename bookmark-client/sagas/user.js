import axios from "axios";
import { takeLatest, call, put, all, fork } from "redux-saga/effects";

import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "../reducers/user";

// 유저 정보 불러오기
async function logInAPI() {
  return axios.get("/login");
}

function* logIn() {
  try {
    const result = yield call(logInAPI);

    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.message,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, logIn);
}

// 로그아웃
async function logOutAPI() {
  return axios.post("/login/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);

    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn)]);
  yield all([fork(watchLogout)]);
}
