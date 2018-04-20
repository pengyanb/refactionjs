import { ACTION_READ_DATA, ACTION_SET_READ_DATA_RESULT } from "./constants";

export function actionReadData(filterInfo) {
  return {
    type: ACTION_READ_DATA,
    filterInfo
  };
}

export function actionSetReadDataResult(result) {
  return {
    type: ACTION_SET_READ_DATA_RESULT,
    result
  };
}
