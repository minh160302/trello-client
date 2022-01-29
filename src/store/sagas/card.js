import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
  ActionPattern,
} from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { CARD } from "../root/constants";
import { createCardService } from "../service/card";

function* createCard(action) {
  const card = yield call(createCardService, action.payload);
  if (card.status === 200) {
    yield put({
      type: SUCCESS(CARD.createCard),
      payload: card,
    });
  } else {
    yield put({
      type: FAILURE(CARD.createCard),
      payload: card,
    });
  }
}

function* cardWorker() {
  yield takeEvery(CARD.createCard, createCard);
}

function* CardWatcher() {
  yield all([cardWorker()]);
}

export default CardWatcher;