import { FAILURE, SUCCESS } from "../root/action-types";
import { AUTH } from "../root/constants";

const initialState = {
  error: {},
  users: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case FAILURE(AUTH.getUsers):
      return {
        ...state,
        error: action.payload,
      };

    case SUCCESS(AUTH.getUsers):
      return {
        ...state,
        error: {},
        users: action.payload,
      };

    default:
      return state;
  }
};
