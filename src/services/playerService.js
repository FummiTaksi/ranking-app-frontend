import axios from 'axios';

const baseUrl = '/api/players';

const getPlayers = async () => {
  const url = `${baseUrl}/`;
  const response = await axios.get(url);
  return response.data;
};

export default { getPlayers };
