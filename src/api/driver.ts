import { Driver, DriverType } from '../types';
import axios, { authConfig } from './axios'; // authConfig

export const getDriverType = async (): Promise<DriverType[]> => {
  const response = await axios.get<DriverType[]>(`/v1/driver-type`, authConfig);
  return response.data;
};

export const getDriver = async (): Promise<Driver[]> => {
  const response = await axios.get<Driver[]>(`/v1/driver`, authConfig);
  return response.data;
};
