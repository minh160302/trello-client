import axios from "axios";

export const createCatalogService = async (payload) => {
  const res = await axios.post("/catalog", payload);
  return res;
};

export const updateCatalogService = async (payload) => {
  const res = await axios.put("/catalog", payload);
  return res;
};

export const deleteCatalogService = async (payload) => {
  const res = await axios.delete(`/catalog/${payload}`);
  return res;
};

export const moveCatalogService = async (payload) => {
  const res = await axios.put("/catalog/move", payload);
  return res;
};
