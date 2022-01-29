import { FAILURE, SUCCESS } from "../root/action-types";
import { CATALOG } from "../root/constants";

const initialState = {
  error: {},
  message: {},
};

export default (state = initialState, action) => {  
  switch (action.type) {
    case FAILURE(CATALOG.moveCatalog):
      return {
        ...state,
        error: action.payload
      }

    case SUCCESS(CATALOG.moveCatalog):
      return {
        ...state,
        error: {},
        message: action.payload,
      };

    default:
      return state;
  }
};
