import { AUTH } from "../root/constants";

export const getUsers = () => {
  return {
    type: AUTH.getUsers,
  };
};
