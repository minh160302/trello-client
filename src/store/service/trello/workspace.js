import axios from "axios";

export const getWorkspaceService = async (payload) => {
  const res = await axios.get(`/trello/workspace/${payload}`);
  return res.data;
}