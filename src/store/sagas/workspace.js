import { call, put, takeEvery, all } from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { WORKSPACE } from "../root/constants";
import { getWorkspaceService } from "../service/trello/workspace";

function* getWorkspace(action) {
  const workspace = yield call(getWorkspaceService, action.payload);
  if (workspace.status === 200) {
    yield put({
      type: SUCCESS(WORKSPACE.getWorkspace),
      payload: workspace,
    });
  } else {
    yield put({
      type: FAILURE(WORKSPACE.getWorkspace),
      payload: workspace,
    });
  }
}

function* workspaceWorker() {
  yield takeEvery(WORKSPACE.getWorkspace, getWorkspace);
}

function* WorkspaceWatcher() {
  yield all([workspaceWorker()]);
}

export default WorkspaceWatcher;
