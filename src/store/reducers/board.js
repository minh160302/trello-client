import { FAILURE, SUCCESS } from "../root/action-types";
import { BOARD } from "../root/constants";

const initialState = {
  error: {},
  board: {},
  renderCreateBoard: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case FAILURE(BOARD.getBoard):
    case FAILURE(BOARD.createBoard):
      return {
        ...state,
        error: action.payload,
      };

    case SUCCESS(BOARD.getBoard):
    case SUCCESS(BOARD.createBoard):
      return {
        ...state,
        error: {},
        board: action.payload,
        renderCreateBoard: !state.renderCreateBoard,
      };

    default:
      return state;
  }
};
