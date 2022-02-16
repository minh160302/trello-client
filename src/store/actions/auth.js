import { AUTH } from "../root/constants";

export const getUsers = () => {
  return {
    type: AUTH.getUsers,
  };
};

export const login = (request) => {
  return {
    type: AUTH.login,
    payload: request,
  };
};
