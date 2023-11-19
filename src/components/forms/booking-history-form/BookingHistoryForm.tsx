import { useFormik } from 'formik';
import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from '../../common';
import { InputError, InputLabel } from '../../input';
import { Form, Row } from '../../layout';
import DriverTypeDropdown from '../../dropdowns/DriverTypeDropdown';
import {
  createBookingHistory,
  getBookingHistoryById,
  updateBookingHistory,
} from '../../../api/bookingHistory';
import { BookingHistoryUpdate } from '../../../types';
import { BOOKINGSTATUS, BOOKINGTYPE } from '../../../types/enum';
import { GoogleMapAutocomplete } from '../../input/GoogleMapAutocomplete/GoogleMapAutocomplete';
import { DriverDropdown, PassengerDropdown } from '../../dropdowns';
import { MapViewModal } from '../../modals';
import StatusDropdown from '../../dropdowns/StatusDropdown';

interface CoordinateProps {
  lat: number;
  lng: number;
}

const BookingHistoryForm = ({ id }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapViewModal, setIsMapViewModal] = useState(false);
  const [origin, setOrigin] = useState<CoordinateProps>();
  const [destination, setDestination] = useState<CoordinateProps>();
  const navigate = useNavigate();

  // Setup react-query for fetching data
  const {
    isLoading: dataLoading,
    data,
    refetch,
    error,
  } = useQuery(['getBookingHistory', { id }], async () => {
    if (id) return getBookingHistoryById(id as string);
  });

  const initialValues: BookingHistoryUpdate = useMemo(() => {
    return {
      driverId: data?.driverId || '',
      userId: data?.userId || '',
      driverTypeId: data?.driver.driverTypeId.toString() || '',
      startLat: data?.startLat.toString() || '',
      startLng: data?.startLng.toString() || '',
      endLat: data?.endLat.toString() || '',
      endLng: data?.endLng.toString() || '',
      status: data?.status || BOOKINGSTATUS.SUCCESS,
      viewMapOnly: true,
      bookingType: BOOKINGTYPE.PHONE_CALL,
    };
  }, [data]);

  // Setup submit handlers
  const onSubmit = async (values: BookingHistoryUpdate) => {
    if (values.viewMapOnly) {
      // If "View map" button is clicked, do not submit the form
      return;
    }
    const update = async () => {
      if (!id) return;
      await updateBookingHistory(id as string, values);
      refetch();
    };
    const create = async () => {
      await createBookingHistory(values);
      navigate(`/booking-history`);
    };

    setIsSubmitting(true);
    try {
      id ? await update() : await create();
    } catch (error) {
      alert(JSON.stringify(error));
    }
    setIsSubmitting(false);
  };

  // Setup validation
  const validate = (values: BookingHistoryUpdate) => {
    const errors: { [key: string]: string } = {};
    if (!values.driverTypeId) {
      errors.name = 'Required';
    }
    return errors;
  };

  // Setup form
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  // If fetching data for provided id, show loading
  if (id && dataLoading) return <Spinner />;

  // If submitting, show loading
  if (isSubmitting) return <Spinner size="large" />;

  // If error fetching data, show error
  if (error) return <InputError error="Failed to load form" touched={true} />;

  // Otherwise show form
  return (
    <>
      <Form customStyles={{ margin: 'auto' }} onSubmit={formik.handleSubmit}>
        <input
          type="hidden"
          name="viewMapOnly"
          value={formik.values.viewMapOnly.toString()}
        />
        <input type="hidden" name="status" value={BOOKINGSTATUS.SUCCESS} />
        <input
          type="hidden"
          name="bookingType"
          value={BOOKINGTYPE.PHONE_CALL}
        />
        <Row justifyContent="center">
          <div>
            <Row>
              <DriverTypeDropdown
                label="Driver Type"
                value={formik.values.driverTypeId}
                onChange={(value) => {
                  formik.setFieldValue('driverTypeId', value);
                }}
                error={formik.errors.driverTypeId}
                touched={formik.touched.driverTypeId}
                required
                asInput
              />
            </Row>
            <Row>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 20,
                }}
              >
                <DriverDropdown
                  value={formik.values.driverId}
                  onChange={(value) => {
                    formik.setFieldValue('driverId', value);
                  }}
                  defaultAccountId={initialValues.driverId}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 20,
                }}
              >
                <PassengerDropdown
                  value={formik.values.userId}
                  onChange={(value) => {
                    formik.setFieldValue('userId', value);
                  }}
                  defaultAccountId={initialValues.userId}
                />
              </div>
            </Row>
            <Row>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 20,
                }}
              >
                <InputLabel label={'Origin'} required={true} />
                <GoogleMapAutocomplete
                  initialValue={{
                    lat: +formik.values.startLat,
                    lng: +formik.values.startLng,
                  }}
                  onChange={(value) => {
                    formik.setFieldValue('startLat', value.lat);
                    formik.setFieldValue('startLng', value.lng);
                  }}
                />
              </div>
            </Row>
            <Row>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 20,
                }}
              >
                <InputLabel label={'Destination'} required={true} />
                <GoogleMapAutocomplete
                  initialValue={{
                    lat: +formik.values.endLat,
                    lng: +formik.values.endLng,
                  }}
                  onChange={(value) => {
                    formik.setFieldValue('endLat', value.lat);
                    formik.setFieldValue('endLng', value.lng);
                    console.log('endLat', value.lat);
                  }}
                />
              </div>
            </Row>
            <Row>
              <StatusDropdown
                value={formik.values.status}
                onChange={(value) => {
                  formik.setFieldValue('status', value);
                }}
              />
            </Row>
            <Row justifyContent="center" alignItems="center" noFlex>
              <Button
                label={id ? 'Save' : 'Add Booking history'}
                onClick={() => {
                  formik.submitForm();
                  formik.setFieldValue('viewMapOnly', false);
                }}
                isSubmit
              />
              <Button
                label="View map"
                onClick={() => {
                  setOrigin({
                    lat: +formik.values.startLat,
                    lng: +formik.values.startLng,
                  });
                  setDestination({
                    lat: +formik.values.endLat,
                    lng: +formik.values.endLng,
                  });
                  setIsMapViewModal(true);
                  formik.setFieldValue('viewMapOnly', true);
                }}
              />
            </Row>
          </div>
        </Row>
      </Form>
      {origin && destination && (
        <MapViewModal
          isOpen={isMapViewModal}
          onClose={() => setIsMapViewModal(false)}
          statment="Map View"
          origin={origin}
          destination={destination}
        />
      )}
    </>
  );
};

export default BookingHistoryForm;
