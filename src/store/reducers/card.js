import { FAILURE, SUCCESS } from "../root/action-types";
import { CARD } from "../root/constants";

const initialState = {
  error: {},
  card: {},
  renderCreateAdd: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case FAILURE(CARD.createCard):
    case FAILURE(CARD.upload):
    case FAILURE(CARD.updateCard):
      return {
        ...state,
        error: action.payload,
      };

    case SUCCESS(CARD.createCard):
      return {
        ...state,
        error: {},
        card: action.payload,
        renderCreateAdd: !state.renderCreateAdd,
      };
    case SUCCESS(CARD.upload):
      return {
        ...state,
        card: {
          ...state.card,
          attachments: [...state.card.attachments, action.payload.path],
        },
        // just upload, not re-render
      };
    case SUCCESS(CARD.updateCard):
      return {
        ...state,
        error: {},
        card: action.payload,
        renderCreateAdd: !state.renderCreateAdd,
      };
    case CARD.openCard:
      return {
        ...state,
        card: action.payload,
      };
    default:
      return state;
  }
};
