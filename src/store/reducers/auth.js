import { FAILURE, SUCCESS } from "../root/action-types";
import { AUTH } from "../root/constants";

const initialState = {
  error: {},
  users: {},
  user: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case FAILURE(AUTH.getUsers):
    case FAILURE(AUTH.login):
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
    case SUCCESS(AUTH.login):
      return {
        ...state,
        user: {
          username: action.payload.username,
          email: action.payload.email,
        },
      };
    default:
      return state;
  }
};
