import axios from 'axios';

const baseUrl = '/api/ranking';

let token = '';

const getConfigObject = () => ({
  headers: { Authorization: token },
});

const createRanking = async (credentials) => {
  const url = `${baseUrl}/new`;
  const response = await axios.post(url, credentials, getConfigObject());
  return response.data;
};

const deleteRanking = async (rankingId) => {
  const url = `${baseUrl}/${rankingId}`;
  const response = await axios.delete(url, getConfigObject());
  return response.data;
};

const getRanking = async (rankingId) => {
  const url = `${baseUrl}/${rankingId}`;
  const response = await axios.get(url);
  return response.data;
};

const getRankings = async () => {
  const url = `${baseUrl}/`;
  const response = await axios.get(url);
  return response.data;
};

export const tokenChanger = store => next => (action) => {
  next(action);
  const state = store.getState();
  const newToken = state.login.token;
  token = `bearer ${newToken}`;
};

export default {
  createRanking, getRankings, deleteRanking, getRanking,
};
