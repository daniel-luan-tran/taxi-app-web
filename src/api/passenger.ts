import { User } from '../types';
import axios, { authConfig } from './axios'; // authConfig

export const getPassenger = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`/v1/passenger`, authConfig);
  return response.data;
};
