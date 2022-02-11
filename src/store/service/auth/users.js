import axios from "axios";

const prefix = "/auth/api/auth";

export const getUsersService = async () => {
  const res = await axios.get(`${prefix}/users`);
  return res.data;
};
