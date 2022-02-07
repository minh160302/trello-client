import { BOARD } from "../root/constants";

export const getBoard = (request) => {
  return {
    type: BOARD.getBoard,
    payload: request,
  };
};

export const createBoard = (request) => {
  return {
    type: BOARD.createBoard,
    payload: request,
  };
};
