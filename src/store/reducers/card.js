import { FAILURE, SUCCESS } from "../root/action-types";
import { CARD } from "../root/constants";

const initialState = {
  error: {},
  card: {},
  renderCreateAdd: false,
  renderCard: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case CARD.clearCard:
      return {
        ...state,
        card: {},
      };
    case FAILURE(CARD.createCard):
    case FAILURE(CARD.upload):
    case FAILURE(CARD.updateCard):
    case FAILURE(CARD.getCardById):
    case FAILURE(CARD.createChecklist):
    case FAILURE(CARD.checkTask):
    case FAILURE(CARD.updateChecklistTitle):
    case FAILURE(CARD.deleteTask):
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
        card: {},
        renderCreateAdd: !state.renderCreateAdd,
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        card: {
          ...state.card,
          description: action.payload,
        },
      };
    case SUCCESS(CARD.getCardById):
      return {
        ...state,
        card: action.payload.data,
      };

    case SUCCESS(CARD.createChecklist):
      return {
        ...state,
        renderCard: !state.renderCard,
      };
    case SUCCESS(CARD.checkTask):
      return {
        ...state,
        renderCard: !state.renderCard,
      };
    case SUCCESS(CARD.updateChecklistTitle):
      return {
        ...state,
        renderCard: !state.renderCard,
      };
    case SUCCESS(CARD.addTask):
      return {
        ...state,
        renderCard: !state.renderCard,
      };
    case SUCCESS(CARD.deleteTask):
      return {
        ...state,
        renderCard: !state.renderCard,
      };
    default:
      return state;
  }
};
