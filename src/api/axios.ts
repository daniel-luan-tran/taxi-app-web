import _axios from 'axios';
import { Account } from '../types';
const { VITE_API_URL, VITE_ANDROID_APK_FOR_DRIVER, VITE_ANDROID_APK_FOR_USER } =
  import.meta.env;

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
  window.open(VITE_ANDROID_APK_FOR_USER);
};
export const downloadAPKForDriver = async () => {
  window.open(VITE_ANDROID_APK_FOR_DRIVER);
};

export default axios;
