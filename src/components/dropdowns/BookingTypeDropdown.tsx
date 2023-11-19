import { useMemo } from 'react';
import { BOOKINGTYPE } from '../../types/enum';
import { DropdownInput } from '../input';

const BookingTypeDropdown = ({
  value,
  onChange,
  error,
  touched,
  label,
  required,
  disabled,
  asInput,
}: ImplementedDropdownProps) => {
  const data = useMemo(() => {
    return [
      {
        id: 'ALL',
        name: 'ALL',
      },
      {
        id: BOOKINGTYPE.MOBILE_APP,
        name: BOOKINGTYPE.MOBILE_APP,
      },
      {
        id: BOOKINGTYPE.PHONE_CALL,
        name: BOOKINGTYPE.PHONE_CALL,
      },
    ];
  }, []);

  // Format Booking type options so they are input compatible
  const bookingTypeOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((bookingType) => ({
      value: bookingType.id.toString(),
      label: bookingType.name,
    }));
  }, [data]);

  return (
    <DropdownInput
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      touched={touched}
      required={required}
      disabled={disabled}
      options={bookingTypeOptions}
      placeholder="Select booking type"
      asInput={asInput}
    />
  );
};

export default BookingTypeDropdown;
