import { DropdownInput } from '../input';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';
import { useCheckAuth, useForceRerender } from '../../hooks';
import { useQueryClient } from 'react-query';

enum OPTION {
  LOGOUT = 'Logout',
}

const AccountDropdown = () => {
  const [accountName, setAccountName] = useState('');
  const [value, setValue] = useState('');
  const { isCheckingAuth, isAuthed, user } = useCheckAuth();
  const forceRerender = useForceRerender();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  // Prevent dropdown value from changing
  useEffect(() => {
    setAccountName(`${user?.firstName} ${user?.lastName}`);
    if (value !== accountName) setValue(accountName);
  }, [value, user, accountName]);

  // Filter options based on admin/public route
  const options = useMemo(() => {
    return [{ value: OPTION.LOGOUT, label: OPTION.LOGOUT }];
  }, []);

  // Handle option selection
  const handleChange = (value: string) => {
    switch (value) {
      case OPTION.LOGOUT:
        logout().then(() => {
          navigate('/login');
          queryClient.removeQueries('checkUser');
        });
        break;
      default:
        break;
    }
    forceRerender();
  };

  // Do not show component if user is not authed
  if (isCheckingAuth || !isAuthed) return null;

  return (
    <DropdownInput
      dropDownName="account-dropdown"
      value={accountName}
      options={options}
      onChange={handleChange}
      isFetching={isCheckingAuth}
    />
  );
};

export default AccountDropdown;
