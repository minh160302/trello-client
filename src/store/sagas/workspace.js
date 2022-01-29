import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
  ActionPattern,
} from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { WORKSPACE } from "../root/constants";
import { getWorkspaceService } from "../service/workspace";

function* getWorkspace(action) {
  const workspace = yield call(getWorkspaceService, action.payload);
  if (workspace.status === 200) {
    yield put({
      type: SUCCESS(WORKSPACE.getWorkspace),
      payload: workspace,
    });
  }
  else {
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
