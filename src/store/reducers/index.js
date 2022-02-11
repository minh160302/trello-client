import { combineReducers } from "redux";
import workspace from "./workspace";
import board from "./board";
import catalog from "./catalog";
import card from "./card";
import auth from "./auth";

const rootReducers = combineReducers({
  workspace,
  board,
  catalog,
  card,
  auth,
});

export default rootReducers;
