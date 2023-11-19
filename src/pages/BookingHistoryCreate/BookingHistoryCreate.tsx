import { Page } from '../../components/layout';
import BookingHistoryForm from '../../components/forms/booking-history-form/BookingHistoryForm';

const BookingHistoryCreate = () => {
  return (
    <Page customStyles={{ padding: 20 }} title="create-booking-history">
      <h1>Add Booking history</h1>
      <BookingHistoryForm />
    </Page>
  );
};

export default BookingHistoryCreate;
