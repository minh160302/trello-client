import { call, put, takeEvery, all } from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { CARD } from "../root/constants";
import {
  addTaskService,
  checkTaskService,
  createCardService,
  createChecklistService,
  deleteTaskService,
  getCardByIdService,
  updateCardService,
  updateChecklistTitleService,
  uploadService,
} from "../service/trello/card";

function* getCardById(action) {
  const card = yield call(getCardByIdService, action.payload);
  if (card.status === 200) {
    yield put({
      type: SUCCESS(CARD.getCardById),
      payload: card,
    });
  } else {
    yield put({
      type: FAILURE(CARD.getCardById),
      payload: card,
    });
  }
}

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

function* createChecklist(action) {
  const res = yield call(createChecklistService, action.payload);
  if (res.status === 200) {
    yield put({
      type: SUCCESS(CARD.createChecklist),
      payload: res.data,
    });
  } else {
    yield put({
      type: FAILURE(CARD.createChecklist),
      payload: res.data,
    });
  }
}

function* checkTask(action) {
  const res = yield call(checkTaskService, action.payload);
  if (res.status === 200) {
    yield put({
      type: SUCCESS(CARD.checkTask),
    });
  } else {
    yield put({
      type: FAILURE(CARD.checkTask),
    });
  }
}

function* updateChecklistTitle(action) {
  const res = yield call(updateChecklistTitleService, action.payload);
  if (res.status === 200) {
    yield put({
      type: SUCCESS(CARD.updateChecklistTitle),
    });
  } else {
    yield put({
      type: FAILURE(CARD.updateChecklistTitle),
    });
  }
}

function* addTask(action) {
  const res = yield call(addTaskService, action.payload);
  if (res.status === 200) {
    yield put({
      type: SUCCESS(CARD.addTask),
    });
  } else {
    yield put({
      type: FAILURE(CARD.addTask),
    });
  }
}

function* deleteTask(action) {
  const res = yield call(deleteTaskService, action.payload);
  if (res.status === 200) {
    yield put({
      type: SUCCESS(CARD.deleteTask),
    });
  } else {
    yield put({
      type: FAILURE(CARD.deleteTask),
    });
  }
}

function* cardWorker() {
  yield takeEvery(CARD.createCard, createCard);
  yield takeEvery(CARD.upload, upload);
  yield takeEvery(CARD.updateCard, updateCard);
  yield takeEvery(CARD.getCardById, getCardById);
  yield takeEvery(CARD.createChecklist, createChecklist);
  yield takeEvery(CARD.checkTask, checkTask);
  yield takeEvery(CARD.updateChecklistTitle, updateChecklistTitle);
  yield takeEvery(CARD.addTask, addTask);
  yield takeEvery(CARD.deleteTask, deleteTask);
}

function* CardWatcher() {
  yield all([cardWorker()]);
}

export default CardWatcher;
