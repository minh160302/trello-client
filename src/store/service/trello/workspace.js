import axios from "axios";

export const getWorkspaceService = async (payload) => {
  const res = await axios.get(`/workspace/${payload}`);
  return res.data;
}