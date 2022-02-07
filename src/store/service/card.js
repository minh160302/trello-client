import axios from "axios"

export const createCardService = async (payload) => {
  const res = await axios.post("/trello/card", payload);
  return res;
}