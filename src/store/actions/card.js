import { CARD } from "../root/constants";

export const getCardById = (request) => {
  return {
    type: CARD.getCardById,
    payload: request,
  };
};

export const clearCard = (request) => {
  return {
    type: CARD.clearCard,
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

// checklist actions

export const createChecklist = (request) => {
  return {
    type: CARD.createChecklist,
    payload: request,
  };
};

export const checkTask = (request) => {
  return {
    type: CARD.checkTask,
    payload: request,
  };
};

export const updateChecklistTitle = (request) => {
  return {
    type: CARD.updateChecklistTitle,
    payload: request,
  };
};

export const addTask = (request) => {
  return {
    type: CARD.addTask,
    payload: request,
  };
};

export const deleteTask = (request) => {
  return {
    type: CARD.deleteTask,
    payload: request,
  };
};
