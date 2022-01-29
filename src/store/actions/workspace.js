import { WORKSPACE } from "../root/constants";

export const getWorkspace = (request) => {
  return {
    type: WORKSPACE.getWorkspace,
    payload: request,
  };
};
