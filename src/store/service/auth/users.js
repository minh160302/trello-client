import axios from "axios";

const prefix = "/auth/api/auth";

export const getUsersService = async () => {
  const res = await axios.get(`${prefix}/users`);
  return res.data;
};

export const loginService = async (payload) => {
  const res = await axios.post(`${prefix}/login`, payload);
  return res.data;
};

export const storeAuthToken = async (token) => {
  if (token) {
    const jwt = token;
    localStorage.setItem("AUTH_TOKEN_KEY", jwt);
    return {
      success: true,
      accessToken: jwt,
    };
  }
};

export const verifyAuthToken = async (payload) => {
  const token = localStorage.getItem("AUTH_TOKEN_KEY");
  if (token) {
    const res = await axios.get(`${prefix}/verify/${token}`);
    return res;
  }
};
