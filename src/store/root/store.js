import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import rootReducers from "../reducers/index";
import loggerMiddlewares from "./logger-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const defaultMiddlewares = [sagaMiddleware, loggerMiddlewares];

const initialize = (initialState, middlewares = []) => {
  const store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...defaultMiddlewares, ...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default initialize;
