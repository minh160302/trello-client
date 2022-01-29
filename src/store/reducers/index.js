import { combineReducers } from "redux";
import workspace from "./workspace";
import board from "./board";
import catalog from "./catalog";
import card from "./card";

const rootReducers = combineReducers({
  workspace,
  board,
  catalog,
  card
});

export default rootReducers;
