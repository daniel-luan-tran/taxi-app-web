import { useMemo } from 'react';
import { InputLabel } from '../input';
import Select from 'react-select';
import { BOOKINGSTATUS } from '../../types/enum';

interface StatusDropdownProps {
  disabled?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

const StatusDropdown = ({ value, onChange, disabled }: StatusDropdownProps) => {
  const data = useMemo(() => {
    return [
      {
        id: BOOKINGSTATUS.DRIVER_CANCEL,
        name: BOOKINGSTATUS.DRIVER_CANCEL,
      },
      {
        id: BOOKINGSTATUS.USER_CANCEL,
        name: BOOKINGSTATUS.USER_CANCEL,
      },
      {
        id: BOOKINGSTATUS.SUCCESS,
        name: BOOKINGSTATUS.SUCCESS,
      },
    ];
  }, []);

  // Format bookingStatus options so they are input compatible
  const bookingStatusOptions: InputOption[] = useMemo(() => {
    if (!data) return [];

    return data.map((status) => ({
      label: status.id || '',
      value: status.name || '',
    }));
  }, [data]);

  const defaultValue = useMemo(() => {
    const filter = bookingStatusOptions.find((item) => item.value === value);
    return filter;
  }, [bookingStatusOptions, value]);

  return (
    <>
      <InputLabel label={'Status'} required={true} />
      <div style={{ marginTop: 10 }}>
        <Select
          className="basic-single"
          classNamePrefix="select"
          value={defaultValue}
          isDisabled={disabled}
          isClearable={true}
          isSearchable={true}
          name="color"
          options={bookingStatusOptions}
          onChange={(e) =>
            value != e?.value ? onChange(e?.value || '') : null
          }
        />
      </div>
    </>
  );
};

export default StatusDropdown;
