import { call, put, takeEvery, all } from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { CARD } from "../root/constants";
import {
  createCardService,
  updateCardService,
  uploadService,
} from "../service/trello/card";

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

function* upload(action) {
  const res = yield call(uploadService, action.payload);
  if (res.status === 200) {
    yield put({
      type: SUCCESS(CARD.upload),
      payload: res.data,
    });
  } else {
    yield put({
      type: FAILURE(CARD.upload),
      payload: res.data,
    });
  }
}

function* updateCard(action) {
  const card = yield call(updateCardService, action.payload);
  if (card.status === 200) {
    yield put({
      type: SUCCESS(CARD.updateCard),
      payload: card.data,
    });
  } else {
    yield put({
      type: FAILURE(CARD.updateCard),
      payload: card.data,
    });
  }
}

function* cardWorker() {
  yield takeEvery(CARD.createCard, createCard);
  yield takeEvery(CARD.upload, upload);
  yield takeEvery(CARD.updateCard, updateCard);
}

function* CardWatcher() {
  yield all([cardWorker()]);
}

export default CardWatcher;
