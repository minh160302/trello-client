import axios from "axios";

export const getBoardService = async (payload) => {
  const res = await axios.get(`/trello/board/${payload}`);
  return res.data;
};

export const createBoardService = async (payload) => {
  const res = await axios.post(`/trello/board`, payload);
  return res.data;
};
