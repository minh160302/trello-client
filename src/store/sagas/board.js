import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
  ActionPattern,
} from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { BOARD } from "../root/constants";
import { getBoardService } from "../service/board";

function* getBoard(action) {
  const board = yield call(getBoardService, action.payload);
  if (board.status === 200) {
    yield put({
      type: SUCCESS(BOARD.getBoard),
      payload: board,
    });
  }
  else {
    yield put({
      type: FAILURE(BOARD.getBoard),
      payload: board,
    });
  }
}

function* boardWorker() {
  yield takeEvery(BOARD.getBoard, getBoard);
}

function* BoardWatcher() {
  yield all([boardWorker()]);
}

export default BoardWatcher;