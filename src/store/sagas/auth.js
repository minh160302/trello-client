import { call, put, takeEvery, all } from "redux-saga/effects";
import { FAILURE, SUCCESS } from "../root/action-types";
import { AUTH } from "../root/constants";
import { getUsersService, loginService } from "../service/auth/users";

function* getUsers(action) {
  const users = yield call(getUsersService, action.payload);
  // TODO: handle error action
  yield put({
    type: SUCCESS(AUTH.getUsers),
    payload: users,
  });
}

function* login(action) {
  const res = yield call(loginService, action.payload);
  if (res?.code === 401) {
    yield put({
      type: FAILURE(AUTH.login),
      payload: res,
    });
  }
  else {
    yield put({
      type: SUCCESS(AUTH.login),
      payload: res,
    });
  }
}

function* AuthWorker() {
  yield takeEvery(AUTH.getUsers, getUsers);
  yield takeEvery(AUTH.login, login);
}

function* AuthWatcher() {
  yield all([AuthWorker()]);
}

export default AuthWatcher;
