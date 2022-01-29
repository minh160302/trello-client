import { FAILURE, SUCCESS } from "../root/action-types";
import { BOARD } from "../root/constants";

const initialState = {
  error: {},
  board: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FAILURE(BOARD.getBoard):
      return {
        ...state,
        error: action.payload,
      };

    case SUCCESS(BOARD.getBoard):
      return {
        ...state,
        error: {},
        board: action.payload,
      };

    default:
      return state;
  }
};
