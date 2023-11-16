import { _ReactIcon } from '../components/common/Icon/Icon';
// import {
//   GooglePlaceData,
//   GooglePlaceDetail,
// } from 'react-native-google-places-autocomplete';
import { BOOKINGSTATUS } from './enum';

declare global {
  export type ReactIcon = _ReactIcon;
}
// export type GoogleData = {
//   data: GooglePlaceData;
//   details?: GooglePlaceDetail;
// };

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type DriverType = {
  id: number;
  name: string;
};

export type BookingHistoryUpdate = {
  userId: string;
  driverId: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  status: BOOKINGSTATUS;
};

export type BookingHistory = {
  id: string;
  userId: string;
  user: User;
  driverId: string;
  driver: Driver;
  bookAt: Date;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  status: BOOKINGSTATUS;
};

export type Account = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  azureOid: string;
  phoneNumber: string;
  address: string;
  displayName?: string;
  driverTypeId?: number;
  Driver?: Driver;
  User?: User;
  Staff?: Staff;
};

export type Driver = {
  accountId: string;
  account: Account;
  driverTypeId: number;
  driverType: DriverType;
};

export type User = {
  accountId: string;
  account: Account;
};

export type Staff = {
  accountId: string;
  account: Account;
};

export type PassengerRoute = {
  from: {
    startLat: number;
    startLng: number;
  };
  to: {
    endLat: number;
    endLng: number;
  };
};
