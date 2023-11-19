import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  geocodeByLatLng,
} from 'react-google-places-autocomplete';
// import AutoComplete from 'react-google-autocomplete';
('react-google-autocomplete');
const { VITE_API_KEY } = import.meta.env;
import { useState, useEffect } from 'react';

interface GoogleMapAutocompleteProps {
  initialValue?: {
    lat: number;
    lng: number;
  };
  onChange: (value: { lat: number; lng: number }) => void;
}

export const GoogleMapAutocomplete = ({
  initialValue,
  onChange,
}: GoogleMapAutocompleteProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<any>();

  useEffect(() => {
    try {
      initialValue &&
        geocodeByLatLng(initialValue)
          .then((results) => {
            console.log('results', results);
            setValue({
              label: results[0].formatted_address,
              value: results[0],
            });
          })
          .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  }, [initialValue]);

  return (
    <div style={{ marginTop: 10 }}>
      <GooglePlacesAutocomplete
        apiKey={VITE_API_KEY}
        selectProps={{
          value,
          onChange: (v) => {
            setValue(v);
            const placeId = v?.value?.place_id;
            placeId &&
              geocodeByPlaceId(placeId)
                .then((results) => {
                  onChange({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                  });
                })
                .catch((error) => console.error(error));
          },
        }}
      />
    </div>
  );
};
