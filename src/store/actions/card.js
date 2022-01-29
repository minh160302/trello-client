import { CARD } from "../root/constants";

export const createCard = (request) => {
  return {
    type: CARD.createCard,
    payload: request,
  };
};