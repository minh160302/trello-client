import { FAILURE, SUCCESS } from "../root/action-types";
import { WORKSPACE } from "../root/constants";

const initialState = {
  error: {},
  workspace: {},
};

export default (state = initialState, action) => {  
  switch (action.type) {
    case FAILURE(WORKSPACE.getWorkspace):
      return {
        ...state,
        error: action.payload
      }

    case SUCCESS(WORKSPACE.getWorkspace):
      return {
        ...state,
        error: {},
        workspace: action.payload,
      };

    default:
      return state;
  }
};
