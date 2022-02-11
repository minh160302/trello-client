import { FAILURE, SUCCESS } from "../root/action-types";
import { CATALOG } from "../root/constants";

const initialState = {
  error: {},
  message: {},
  renderCreateCatalog: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case FAILURE(CATALOG.moveCatalog):
    case FAILURE(CATALOG.createCatalog):
    case FAILURE(CATALOG.updateCatalog):
    case FAILURE(CATALOG.deleteCatalog):
      return {
        ...state,
        error: action.payload,
      };

    case SUCCESS(CATALOG.moveCatalog):
      return {
        ...state,
        error: {},
        message: action.payload,
        renderCreateCatalog: !state.renderCreateCatalog,
      };
    case SUCCESS(CATALOG.createCatalog):
      return {
        ...state,
        error: {},
        message: action.payload,
        renderCreateCatalog: !state.renderCreateCatalog,
      };
    case SUCCESS(CATALOG.updateCatalog):
      return {
        ...state,
        error: {},
        message: action.payload,
        renderCreateCatalog: !state.renderCreateCatalog,
      };
    case SUCCESS(CATALOG.deleteCatalog):
      return {
        ...state,
        error: {},
        message: action.payload,
        renderCreateCatalog: !state.renderCreateCatalog,
      };

    default:
      return state;
  }
};
