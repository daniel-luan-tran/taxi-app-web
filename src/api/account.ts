import { Account } from '../types';
import axios, { authConfig } from './axios'; // authConfig

export const updateUser = async (
  id: string,
  updatedUser: Account,
): Promise<Account> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Staff, Driver, User, ...account } = updatedUser;
  const response = await axios.put<Account>(
    `/v1/azureDrivers/${id}`,
    {
      ...account,
    },
    authConfig,
  );

  return response.data;
};

export const checkUser = async (): Promise<Account> => {
  const response = await axios.get<Account>(
    '/v1/auth/azureAD/check',
    authConfig,
  );

  console.log('response.data', response.data);
  return response.data;
};
