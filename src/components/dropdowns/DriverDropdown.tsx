import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { InputError, InputLabel } from '../input';
import { getDriver } from '../../api/driver';
import Select from 'react-select';

interface DriverDropdownProps {
  disabled?: boolean;
  defaultAccountId?: string;
  value?: string;
  onChange: (value: string) => void;
}

const DriverDropdown = ({
  value,
  onChange,
  disabled,
  defaultAccountId,
}: DriverDropdownProps) => {
  const {
    error: fetchError,
    isLoading,
    data,
  } = useQuery(['getDriver'], async () => getDriver());

  // Format Driver options so they are input compatible
  const driverOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((driver) => ({
      label: driver.account.displayName || '',
      value: driver.accountId.toString(),
    }));
  }, [data]);

  const defaultValue = useMemo(() => {
    const filter = driverOptions.find(
      (item) => item.value === defaultAccountId,
    );
    return filter;
  }, [defaultAccountId, driverOptions]);

  // If error fetching data
  if (fetchError)
    return <InputError error="Error fetching driver types" touched />;

  return (
    <>
      <InputLabel label={'Driver'} required={true} />
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
          options={driverOptions}
          onChange={(e) =>
            value != e?.value ? onChange(e?.value || '') : null
          }
        />
      </div>
    </>
  );
};

export default DriverDropdown;
