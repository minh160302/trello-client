import axios from "axios";

export const getCardByIdService = async (payload) => {
  const res = await axios.get(`/card/${payload}`);
  return res.data;
};

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

// checklist services
export const createChecklistService = async (payload) => {
  const res = await axios.post("/checklist", payload);
  return res;
};

export const checkTaskService = async (payload) => {
  const res = await axios.put(
    `/checklist/${payload.id}/index/${payload.index}`
  );
  return res;
};

export const updateChecklistTitleService = async (payload) => {
  const res = await axios.put(`/checklist/title`, payload);
  return res.data;
};

export const addTaskService = async (payload) => {
  const body = { title: payload.title };
  const res = await axios.post(`/checklist/${payload.id}`, body);
  return res.data;
};

export const deleteTaskService = async (payload) => {
  const res = await axios.delete(
    `/checklist/${payload.id}/index/${payload.index}`
  );
  return res.data;
};
