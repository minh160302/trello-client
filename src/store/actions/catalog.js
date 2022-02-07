import { CATALOG } from "../root/constants";

export const createCatalog = (request) => {
  return {
    type: CATALOG.createCatalog,
    payload: request,
  };
};

export const updateCatalog = (request) => {
  return {
    type: CATALOG.updateCatalog,
    payload: request,
  };
};

export const deleteCatalog = (request) => {
  return {
    type: CATALOG.deleteCatalog,
    payload: request,
  };
};

export const moveCatalog = (request) => {
  return {
    type: CATALOG.moveCatalog,
    payload: request,
  };
};
