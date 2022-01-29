import axios from "axios"

export const moveCatalogService = async (payload) => {
  const res = await axios.put("/catalog/move", payload);
  return res;
}