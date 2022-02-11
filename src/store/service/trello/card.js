import axios from "axios";

export const createCardService = async (payload) => {
  const res = await axios.post("/card", payload);
  return res;
};

export const uploadService = async (payload) => {
  const res = await axios.post("/upload", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const updateCardService = async (payload) => {
  const res = await axios.put("/card", payload);
  return res.data;
};
