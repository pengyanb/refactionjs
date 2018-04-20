import { fromJS } from "immutable";
import { ACTION_SET_READ_DATA_RESULT } from "./constants";

const initialState = fromJS({
  readDataResult: {}
});

function censusPageReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_SET_READ_DATA_RESULT:
      return state.set("readDataResult", action.result);
    default:
      return state;
  }
}

export default censusPageReducer;
