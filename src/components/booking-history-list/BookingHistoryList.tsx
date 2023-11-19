import './BookingHistoryList.styles.scss';
import { Row } from '../../components/layout';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common';
import { TextInput } from '../../components/input';
import { useMemo, useState, useEffect } from 'react';
import { BookingHistoryTable } from '../tables/BookingHistoryTable';
import { BookingHistory } from '../../types';
import { getBookingHistory } from '../../api/bookingHistory';
import useSearchParamsState from '../../hooks/useSearchParamsState';
import { BookingTypeDropdown } from '../dropdowns';

export const BookingHistoryList = () => {
  const [query, setQuery] = useState('');
  const [bookingTypeParam, setBookingTypeParam] = useSearchParamsState(
    'bookingType',
    'ALL',
  );

  useEffect(() => {
    setBookingTypeParam(bookingTypeParam);
  }, []);

  // Fetch data
  const { isLoading, data: bookingHistories } = useQuery(
    ['getBookingHistory'],
    async () => await getBookingHistory(),
  );

  // Filter data to match query
  const filteredHistories = useMemo(() => {
    if (!bookingHistories) return [];
    return bookingHistories
      .filter((bookingHistory: BookingHistory) => {
        return (
          bookingHistory.driver.account.displayName
            ?.toLowerCase()
            .includes(query.toLowerCase()) ||
          bookingHistory.user.account.displayName
            ?.toLowerCase()
            .includes(query.toLowerCase())
        );
      })
      .filter((item) => {
        if (bookingTypeParam === 'ALL') {
          return true;
        } else {
          return item.bookingType === bookingTypeParam;
        }
      });
  }, [bookingHistories, query, bookingTypeParam]);

  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Row alignItems="center" disableWrapping noFlex>
        <h1 style={{ width: 'auto', margin: 0 }}>Booking history</h1>
        <div
          style={{
            minWidth: 400,
            maxWidth: 500,
            // display: 'flex',
            // flexDirection: 'column',
          }}
        >
          <TextInput
            placeholder="Search passenger or driver name"
            value={query}
            onChange={setQuery}
            icon="IoSearch"
            rounded
          />
          <BookingTypeDropdown
            onChange={setBookingTypeParam}
            value={bookingTypeParam}
          />
        </div>

        <Button
          label="New Booking"
          onClick={() => navigate('/booking-history/new')}
          icon="IoAdd"
        />
      </Row>

      <BookingHistoryTable
        data={
          filteredHistories.map((item, index) => {
            return {
              number: index + 1,
              ...item,
            };
          }) || []
        }
        isLoading={isLoading}
      />
    </div>
  );
};
