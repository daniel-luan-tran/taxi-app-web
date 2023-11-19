import { BookingHistory, BookingHistoryUpdate } from '../types';
import axios, { authConfig } from './axios'; // authConfig

export const getBookingHistory = async (): Promise<BookingHistory[]> => {
  const response = await axios.get<BookingHistory[]>(
    `/v1/booking-history`,
    authConfig,
  );

  return response.data;
};

export const getBookingHistoryById = async (
  id: string,
): Promise<BookingHistory> => {
  const response = await axios.get<BookingHistory>(
    `/v1/booking-history/${id}`,
    authConfig,
  );

  return response.data;
};

export const updateBookingHistory = async (
  id: string,
  data: BookingHistoryUpdate,
) => {
  const updateData = {
    startLat: parseFloat(data.startLat),
    startLng: parseFloat(data.startLng),
    endLat: parseFloat(data.endLat),
    endLng: parseFloat(data.endLng),
    userId: data.userId,
    driverId: data.driverId,
    driverTypeId: data.driverTypeId,
    status: data.status,
    bookingType: data.bookingType,
  };
  await axios.put(`/v1/booking-history/${id}`, updateData, authConfig);
};

export const createBookingHistory = async (data: BookingHistoryUpdate) => {
  const updateData = {
    startLat: parseFloat(data.startLat),
    startLng: parseFloat(data.startLng),
    endLat: parseFloat(data.endLat),
    endLng: parseFloat(data.endLng),
    userId: data.userId,
    driverId: data.driverId,
    driverTypeId: data.driverTypeId,
    status: data.status,
    bookingType: data.bookingType,
  };
  await axios.post(`/v1/booking-history/`, updateData, authConfig);
};
