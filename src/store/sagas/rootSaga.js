import { all, fork } from "redux-saga/effects";
import AuthWatcher from "./auth";
import BoardWatcher from "./board";
import CardWatcher from "./card";
import CatalogWatcher from "./catalog";
import WorkspaceWatcher from "./workspace";

export default function* rootSaga() {
  yield all([
    fork(WorkspaceWatcher),
    fork(BoardWatcher),
    fork(CatalogWatcher),
    fork(CardWatcher),
    fork(AuthWatcher),
  ]);
}
