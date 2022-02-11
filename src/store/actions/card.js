import { CARD } from "../root/constants";

export const openCard = (request) => {
  return {
    type: CARD.openCard,
    payload: request,
  };
};

export const createCard = (request) => {
  return {
    type: CARD.createCard,
    payload: request,
  };
};

export const upload = (request) => {
  return {
    type: CARD.upload,
    payload: request,
  };
};

export const updateCard = (request) => {
  return {
    type: CARD.updateCard,
    payload: request,
  };
};
