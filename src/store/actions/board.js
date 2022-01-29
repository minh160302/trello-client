import { BOARD } from "../root/constants";

export const getBoard = (request) => {
  return {
    type: BOARD.getBoard,
    payload: request,
  };
};