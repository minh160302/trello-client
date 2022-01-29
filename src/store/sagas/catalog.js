import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
  ActionPattern,
} from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { CATALOG } from "../root/constants";
import { moveCatalogService } from "../service/catalog";

function* moveCatalog(action) {
  const board = yield call(moveCatalogService, action.payload);
  if (board.status === 200) {
    yield put({
      type: SUCCESS(CATALOG.moveCatalog),
      payload: board,
    });
  } else {
    yield put({
      type: FAILURE(CATALOG.moveCatalog),
      payload: board,
    });
  }
}

function* catalogWorker() {
  yield takeEvery(CATALOG.moveCatalog, moveCatalog);
}

function* CatalogWatcher() {
  yield all([catalogWorker()]);
}

export default CatalogWatcher;
