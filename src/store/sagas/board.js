import { call, put, takeEvery, all } from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { BOARD } from "../root/constants";
import { createBoardService, getBoardService } from "../service/board";

function* getBoard(action) {
  const board = yield call(getBoardService, action.payload);
  if (board.status === 200) {
    yield put({
      type: SUCCESS(BOARD.getBoard),
      payload: board,
    });
  } else {
    yield put({
      type: FAILURE(BOARD.getBoard),
      payload: board,
    });
  }
}

function* createBoard(action) {
  const board = yield call(createBoardService, action.payload);
  if (board.status === 201) {
    yield put({
      type: SUCCESS(BOARD.createBoard),
      payload: board,
    });
  } else {
    yield put({
      type: FAILURE(BOARD.createBoard),
      payload: board,
    });
  }
}

function* boardWorker() {
  yield takeEvery(BOARD.getBoard, getBoard);
  yield takeEvery(BOARD.createBoard, createBoard);
}

function* BoardWatcher() {
  yield all([boardWorker()]);
}

export default BoardWatcher;
