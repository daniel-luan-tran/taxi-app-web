import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { InputError, DropdownInput } from '../input';
import { getDriverType } from '../../api/driver';

const DriverTypeDropdown = ({
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
  asInput,
}: ImplementedDropdownProps) => {
  const {
    error: fetchError,
    isLoading,
    data,
  } = useQuery(['getDriverType'], async () => getDriverType());

  // Format DriverType options so they are input compatible
  const driverTypeOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((driverType) => ({
      value: driverType.id.toString(),
      label: driverType.name,
    }));
  }, [data]);

  // If error fetching data
  if (fetchError)
    return <InputError error="Error fetching driver types" touched />;

  return (
    <DropdownInput
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled}
      options={driverTypeOptions}
      placeholder="Select driver type"
      asInput={asInput}
      isFetching={isLoading}
    />
  );
};

export default DriverTypeDropdown;
