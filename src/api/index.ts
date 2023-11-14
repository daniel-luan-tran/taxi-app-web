import axios from './axios'; // authConfig

export const spinUpWebService = async () => {
  const response = await axios.get('/spin-up');
  return response.data;
};
