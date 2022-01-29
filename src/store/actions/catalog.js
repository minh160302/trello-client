import { CATALOG } from "../root/constants";

export const moveCatalog = (request) => {
  return {
    type: CATALOG.moveCatalog,
    payload: request
  }
}