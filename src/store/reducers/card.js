import { FAILURE, SUCCESS } from "../root/action-types";
import { CARD } from "../root/constants";

const initialState = {
  error: {},
  card: {},
  renderCreateAdd: false,
};

export default (state = initialState, action) => {  
  switch (action.type) {
    case FAILURE(CARD.createCard):
      return {
        ...state,
        error: action.payload
      }

    case SUCCESS(CARD.createCard):
      return {
        ...state,
        error: {},
        card: action.payload,
        renderCreateAdd: !state.renderCreateAdd
      };

    default:
      return state;
  }
};