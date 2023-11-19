import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { InputError, InputLabel } from '../input';
import { getPassenger } from '../../api/passenger';
import Select from 'react-select';
import { User } from '../../types';

interface PassengerDropdownProps {
  disabled?: boolean;
  defaultAccountId?: string;
  value?: string;
  onChange: (value: string) => void;
}

const PassengerDropdown = ({
  value,
  onChange,
  disabled,
  defaultAccountId,
}: PassengerDropdownProps) => {
  const {
    error: fetchError,
    isLoading,
    data,
  } = useQuery(['getPassenger'], async () => getPassenger());

  // Format Passenger options so they are input compatible
  const passengerOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((passenger: User) => ({
      label: passenger.account.displayName || '',
      value: passenger.accountId.toString(),
    }));
  }, [data]);

  const defaultValue = useMemo(() => {
    const filter = passengerOptions.find(
      (item) => item.value === defaultAccountId,
    );
    return filter;
  }, [defaultAccountId, passengerOptions]);

  // If error fetching data
  if (fetchError)
    return <InputError error="Error fetching driver types" touched />;

  return (
    <>
      <InputLabel label={'Passenger'} required={true} />
      <div style={{ marginTop: 10 }}>
        <Select
          className="basic-single"
          classNamePrefix="select"
          value={defaultValue}
          isDisabled={disabled}
          isLoading={isLoading}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={passengerOptions}
          onChange={(e) =>
            value != e?.value ? onChange(e?.value || '') : null
          }
        />
      </div>
    </>
  );
};

export default PassengerDropdown;
