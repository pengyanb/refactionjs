import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import querystring from "querystring";
import { ACTION_READ_DATA } from "./constants";

import { actionSetReadDataResult } from "./actions";

export function* readDataRequest(action) {
  const url = "/data/read";
  try {
    const res = yield axios.post(url, action.filterInfo);
    yield put(actionSetReadDataResult(res.data));
  } catch (err) {
    yield put(
      actionSetReadDataResult({ error: true, message: err.toString() })
    );
  }
}

export function* readDataWatcher() {
  yield takeLatest(ACTION_READ_DATA, readDataRequest);
}

export default function* rootSage() {
  yield [readDataWatcher()];
}
