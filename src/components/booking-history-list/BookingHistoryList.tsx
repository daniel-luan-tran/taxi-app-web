import './BookingHistoryList.styles.scss';
import { Row } from '../../components/layout';
import { useQuery } from 'react-query';
// import { getLeagues } from '../api/leagues';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common';
import { TextInput } from '../../components/input';
import { useMemo, useState } from 'react';
import { BookingHistoryTable } from '../tables/BookingHistoryTable';
import { BookingHistory } from '../../types';
import { getBookingHistory } from '../../api/bookingHistory';

export const BookingHistoryList = () => {
  const [query, setQuery] = useState('');

  // Fetch data
  const { isLoading, data: bookingHistories } = useQuery(
    ['getBookingHistory'],
    async () => await getBookingHistory(),
  );

  // Filter data to match query
  const filteredHistories = useMemo(() => {
    console.log('bookingHistories', bookingHistories);
    if (!bookingHistories) return [];
    return bookingHistories.filter((bookingHistory: BookingHistory) => {
      return (
        bookingHistory.driver.account.displayName
          ?.toLowerCase()
          .includes(query.toLowerCase()) ||
        bookingHistory.user.account.displayName
          ?.toLowerCase()
          .includes(query.toLowerCase())
      );
    });
  }, [bookingHistories, query]);

  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Row alignItems="center" disableWrapping noFlex>
        <h1 style={{ width: 'max-content' }}>Booking history</h1>
        <div style={{ minWidth: 400, maxWidth: 500 }}>
          <TextInput
            placeholder="Search..."
            value={query}
            onChange={setQuery}
            icon="IoSearch"
            rounded
          />
        </div>
        <Button
          label="New Booking"
          onClick={() => navigate('/booking/new')}
          icon="IoAdd"
        />
      </Row>

      <BookingHistoryTable data={filteredHistories} isLoading={isLoading} />
    </div>
  );
};
