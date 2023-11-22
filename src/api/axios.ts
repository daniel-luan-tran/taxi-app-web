import _axios from 'axios';
import { Account } from '../types';
const { VITE_API_URL } = import.meta.env;

export const authConfig = {
  withCredentials: true,
};

const axios = _axios.create({ baseURL: VITE_API_URL });

export const loginAD = async () => {
  window.location.href = `${VITE_API_URL}/v1/auth/azureAD/login-for-staffs`;
};

export const checkUser = async (): Promise<Account> => {
  const data = await axios.get(`/v1/auth/azureAD/check`, authConfig);
  console.log(data);
  return data.data;
};

export const logout = async () => {
  const data = await axios.get(`/v1/auth/azureAD/logout`, authConfig);
  window.location.href = data.data.logoutLink;
};

export const downloadAPKForUser = async () => {
  window.open(
    'https://expo.dev/accounts/daniel.luan.tran/projects/userApp/builds/b3f5c370-832c-4c91-9c13-fba322686306',
  );
};
export const downloadAPKForDriver = async () => {
  window.open(
    'https://expo.dev/accounts/daniel.luan.tran/projects/driverApp/builds/7a223692-cdee-48d9-98b9-9518d0609866',
  );
};

export default axios;
