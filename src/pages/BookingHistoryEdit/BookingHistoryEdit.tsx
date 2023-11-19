import { Page } from '../../components/layout';
import { useLocation } from 'react-router-dom';
import BookingHistoryForm from '../../components/forms/booking-history-form/BookingHistoryForm';

const BookingHistoryEdit = () => {
  // Get id from url
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  console.log('id', id);
  return (
    <Page customStyles={{ padding: 20 }} title="edit-booking-history">
      <h1>Edit Booking history</h1>
      {id && <BookingHistoryForm id={id} />}
    </Page>
  );
};

export default BookingHistoryEdit;
