import { call, put, takeEvery, all } from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { AUTH } from "../root/constants";
import { getUsersService } from "../service/auth/users";

function* getUsers(action) {
  const users = yield call(getUsersService, action.payload);
  // TODO: handle error action
  yield put({
    type: SUCCESS(AUTH.getUsers),
    payload: users,
  });
}

function* AuthWorker() {
  yield takeEvery(AUTH.getUsers, getUsers);
}

function* AuthWatcher() {
  yield all([AuthWorker()]);
}

export default AuthWatcher;
