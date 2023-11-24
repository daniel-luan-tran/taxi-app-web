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
  const [queryName, setQueryName] = useState('');
  const [queryPhone, setQueryPhone] = useState('');
  const [bookingTypeParam, setBookingTypeParam] = useSearchParamsState(
    'bookingType',
    'ALL',
  );

  useEffect(() => {
    setBookingTypeParam(bookingTypeParam);
  }, []);

  // Fetch data
  const {
    isLoading,
    data: bookingHistories,
    refetch,
  } = useQuery(['getBookingHistory'], async () => await getBookingHistory());

  // Filter data to match query
  const filteredHistories = useMemo(() => {
    if (!bookingHistories) return [];
    return bookingHistories
      .filter((bookingHistory: BookingHistory) => {
        return (
          (bookingHistory.driver.account.displayName
            ?.toLowerCase()
            .includes(queryName.toLowerCase()) ||
            bookingHistory.user.account.displayName
              ?.toLowerCase()
              .includes(queryName.toLowerCase())) &&
          (bookingHistory.driver.account.phoneNumber.includes(queryPhone) ||
            bookingHistory.user.account.phoneNumber.includes(queryPhone))
        );
      })
      .filter((item) => {
        if (bookingTypeParam === 'ALL') {
          return true;
        } else {
          return item.bookingType === bookingTypeParam;
        }
      });
  }, [bookingHistories, queryName, queryPhone, bookingTypeParam]);

  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Row alignItems="center" disableWrapping noFlex>
        <h1 style={{ width: 'auto', margin: 0 }}>Booking history</h1>
        <div
          style={{
            minWidth: 550,
            maxWidth: 500,
            // display: 'flex',
            // flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: 60 }}>
            <TextInput
              placeholder="Search passenger or driver name"
              value={queryName}
              onChange={setQueryName}
              icon="IoSearch"
              rounded
            />
            <TextInput
              placeholder="Search passenger or driver phone"
              value={queryPhone}
              onChange={setQueryPhone}
              icon="IoSearch"
              rounded
            />
          </div>
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
        refetch={refetch}
      />
    </div>
  );
};
