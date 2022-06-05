import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";
import directorySaga from "./directory";
import { backUrl } from "../config/config";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3035" : backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga), fork(directorySaga)]);
}
