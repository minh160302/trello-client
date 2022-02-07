import axios from "axios";

export const createCatalogService = async (payload) => {
  const res = await axios.post("/trello/catalog", payload);
  return res;
};

export const updateCatalogService = async (payload) => {
  const res = await axios.put("/trello/catalog", payload);
  return res;
};

export const deleteCatalogService = async (payload) => {
  const res = await axios.delete(`/trello/catalog/${payload}`);
  return res;
};

export const moveCatalogService = async (payload) => {
  const res = await axios.put("/trello/catalog/move", payload);
  return res;
};
