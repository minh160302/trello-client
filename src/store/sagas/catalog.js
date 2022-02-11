import { call, put, takeEvery, all } from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { CATALOG } from "../root/constants";
import {
  createCatalogService,
  deleteCatalogService,
  moveCatalogService,
  updateCatalogService,
} from "../service/trello/catalog";

function* createCatalog(action) {
  const catalog = yield call(createCatalogService, action.payload);
  if (catalog.status === 200) {
    yield put({
      type: SUCCESS(CATALOG.createCatalog),
      payload: catalog,
    });
  } else {
    yield put({
      type: FAILURE(CATALOG.createCatalog),
      payload: catalog,
    });
  }
}

function* moveCatalog(action) {
  const catalog = yield call(moveCatalogService, action.payload);
  if (catalog.status === 200) {
    yield put({
      type: SUCCESS(CATALOG.moveCatalog),
      payload: catalog,
    });
  } else {
    yield put({
      type: FAILURE(CATALOG.moveCatalog),
      payload: catalog,
    });
  }
}

function* updateCatalog(action) {
  const catalog = yield call(updateCatalogService, action.payload);
  if (catalog.status === 200) {
    yield put({
      type: SUCCESS(CATALOG.updateCatalog),
      payload: catalog,
    });
  } else {
    yield put({
      type: FAILURE(CATALOG.updateCatalog),
      payload: catalog,
    });
  }
}

function* deleteCatalog(action) {
  const catalog = yield call(deleteCatalogService, action.payload);
  if (catalog.status === 200) {
    yield put({
      type: SUCCESS(CATALOG.deleteCatalog),
      payload: catalog,
    });
  } else {
    yield put({
      type: FAILURE(CATALOG.deleteCatalog),
      payload: catalog,
    });
  }
}

function* catalogWorker() {
  yield takeEvery(CATALOG.moveCatalog, moveCatalog);
  yield takeEvery(CATALOG.createCatalog, createCatalog);
  yield takeEvery(CATALOG.updateCatalog, updateCatalog);
  yield takeEvery(CATALOG.deleteCatalog, deleteCatalog);
}

function* CatalogWatcher() {
  yield all([catalogWorker()]);
}

export default CatalogWatcher;
