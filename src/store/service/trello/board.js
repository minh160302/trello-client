import axios from "axios";

export const getBoardService = async (payload) => {
  const res = await axios.get(`/board/${payload}`);
  return res.data;
};

export const createBoardService = async (payload) => {
  const res = await axios.post(`/board`, payload);
  return res.data;
};
