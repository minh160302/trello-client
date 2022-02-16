import axios from "axios";

export const getCardByIdService = async (payload) => {
  const res = await axios.get(`/trello/card/${payload}`);
  return res.data;
};

export const createCardService = async (payload) => {
  const res = await axios.post("/trello/card", payload);
  return res;
};

export const uploadService = async (payload) => {
  const res = await axios.post("/trello/upload", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const updateCardService = async (payload) => {
  const res = await axios.put("/trello/card", payload);
  return res.data;
};

// checklist services
export const createChecklistService = async (payload) => {
  const res = await axios.post("/trello/checklist", payload);
  return res;
};

export const checkTaskService = async (payload) => {
  const res = await axios.put(
    `/trello/checklist/${payload.id}/index/${payload.index}`
  );
  return res;
};

export const updateChecklistTitleService = async (payload) => {
  const res = await axios.put(`/trello/checklist/title`, payload);
  return res.data;
};

export const addTaskService = async (payload) => {
  const body = { title: payload.title };
  const res = await axios.post(`/trello/checklist/${payload.id}`, body);
  return res.data;
};

export const deleteTaskService = async (payload) => {
  const res = await axios.delete(
    `/trello/checklist/${payload.id}/index/${payload.index}`
  );
  return res.data;
};
