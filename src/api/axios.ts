import _axios from "axios";
const { VITE_API_URL } = import.meta.env;

export const authConfig = {
  withCredentials: true,
};

const axios = _axios.create({ baseURL: VITE_API_URL });

export const loginAD = async () => {
  window.location.href = `${VITE_API_URL}/api/v1/auth/azureAD/login-for-staffs`;
};

export const checkUser = async () => {
  const data = await axios.get(`/api/v1/auth/check`, authConfig);
  console.log(data);
};

export const logout = async () => {
  const data = await axios.get(`/api/v1/auth/azureAD/logout`, authConfig);
  window.location.href = data.data.logoutLink;
};

export default axios;
