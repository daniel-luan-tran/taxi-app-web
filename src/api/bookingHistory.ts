import { BookingHistory } from '../types';
import axios, { authConfig } from './axios'; // authConfig

export const getBookingHistory = async (): Promise<BookingHistory[]> => {
  const response = await axios.get<BookingHistory[]>(
    `/v1/booking-history`,
    authConfig,
  );

  return response.data;
};
