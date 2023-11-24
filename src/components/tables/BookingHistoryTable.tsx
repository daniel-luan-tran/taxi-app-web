import { useNavigate } from 'react-router-dom';
import { Table, Tbody, Td, Th, Thead, Tr } from '../layout/Table';
import { Button, Spinner } from '../common';
import { DateTime } from 'luxon';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { BookingHistory } from '../../types';
import { Row } from '../layout';
import { DangerModal, MapViewModal } from '../modals';
import { deleteBooking } from '../../api/bookingHistory';

interface BookingHistoryMap extends BookingHistory {
  number: number;
}

interface CoordinateProps {
  lat: number;
  lng: number;
}

interface BookingHistoryTableProps {
  data: BookingHistoryMap[];
  isLoading?: boolean;
  refetch: () => void;
}

export const BookingHistoryTable = ({
  data,
  isLoading,
  refetch,
}: BookingHistoryTableProps) => {
  const [isMapViewModal, setIsMapViewModal] = useState<boolean>(false);
  const [origin, setOrigin] = useState<CoordinateProps>();
  const [destination, setDestination] = useState<CoordinateProps>();
  const [dangerModalOpen, setDangerModalOpen] = useState<boolean>(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState<string>('');
  const navigate = useNavigate();

  const handleConfirmDelete = async (id: string) => {
    setDangerModalOpen(!dangerModalOpen);
    setBookingIdToDelete(id);
  };

  const handleDeleteBooking = async (id: string, refetch: () => void) => {
    if (id) {
      await deleteBooking(id);
      refetch();
      setDangerModalOpen(!dangerModalOpen);
      setBookingIdToDelete('');
    }
  };

  // Setup columns
  const columns = useMemo<ColumnDef<BookingHistoryMap>[]>(
    () => [
      {
        header: 'No.',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.number,
        enableSorting: true,
      },
      {
        header: 'Passenger Name',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.user.account.displayName,
        enableSorting: true,
      },
      {
        header: 'Passenger Phone',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.user.account.phoneNumber,
        enableSorting: true,
      },
      {
        header: 'Driver Name',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.driver.account.displayName,
        enableSorting: true,
      },
      {
        header: 'Driver Phone',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.driver.account.phoneNumber,
        enableSorting: false,
      },
      {
        header: 'Driver Type',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.driver.driverType.name,
        enableSorting: true,
      },
      {
        header: 'Coordinate [(startLat, startLng); (endLat, endLng)]',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => {
          return `[(${row.startLat}, ${row.startLng}); (${row.endLat}, ${row.endLng})]`;
        },
        enableSorting: true,
      },
      {
        header: 'Booking date',
        footer: (props) => props.column.id,
        cell: ({ getValue }) => {
          const dateTime = DateTime.fromISO(getValue() as string)
            .toUTC()
            .toLocaleString(DateTime.DATETIME_SHORT);
          return <p>{dateTime}</p>;
        },
        sortingFn: 'datetime',
        accessorFn: (row) => row.bookAt,
        enableSorting: true,
      },
      {
        header: 'Booking Type',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.bookingType.split('_').join(' '),
        enableSorting: true,
      },
      {
        header: 'Status',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.status.split('_').join(' '),
        enableSorting: true,
      },
      {
        header: 'Action',
        footer: (props) => props.column.id,
        cell: (info) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Row
              alignItems="center"
              justifyContent="center"
              noFlex
              disableWrapping
            >
              <Button
                label="Edit"
                type="secondary"
                icon="IoPencilOutline"
                size="small"
                onClick={() =>
                  navigate(`/booking-history/edit?id=${info.getValue()}`)
                }
              />
              <Button
                label="Map view"
                type="secondary"
                icon="IoMapSharp"
                size="small"
                onClick={() => {
                  setOrigin({
                    lat: info.row.original.startLat,
                    lng: info.row.original.startLng,
                  });
                  setDestination({
                    lat: info.row.original.endLat,
                    lng: info.row.original.endLng,
                  });
                  setIsMapViewModal(true);
                }}
              />
            </Row>
            <Row
              alignItems="center"
              justifyContent="center"
              noFlex
              disableWrapping
            >
              <Button
                label="Delete"
                type="danger"
                icon="IoPencilOutline"
                size="small"
                onClick={() => {
                  handleConfirmDelete(info.getValue() as string);
                }}
              />
            </Row>
          </div>
        ),
        sortingFn: 'text',
        accessorFn: (row) => row.id,
        enableSorting: false,
      },
    ],
    [],
  );

  // Setup table
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  // If loading
  if (isLoading) return <Spinner size="large" />;

  // If no data
  if (!isLoading && !data.length) return <p>No booking history found</p>;

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            {table.getFlatHeaders().map((header) => {
              const onClickIfSortable = header.column.getCanSort()
                ? header.column.getToggleSortingHandler()
                : undefined;
              return header.isPlaceholder ? null : (
                <Th
                  key={header.id}
                  onClick={onClickIfSortable}
                  sorted={header.column.getIsSorted()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {origin && destination && (
        <MapViewModal
          isOpen={isMapViewModal}
          onClose={() => setIsMapViewModal(false)}
          statment="Map View"
          origin={origin}
          destination={destination}
        />
      )}
      <DangerModal
        isOpen={dangerModalOpen}
        onClose={() => setDangerModalOpen(!dangerModalOpen)}
        message="Are you sure to delete?"
        buttonLabel="Delete"
        buttonOnClick={() => handleDeleteBooking(bookingIdToDelete, refetch)}
      />
    </>
  );
};
