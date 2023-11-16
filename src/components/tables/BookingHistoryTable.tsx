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

interface BookingHistoryTableProps {
  data: BookingHistory[];
  isLoading?: boolean;
}

export const BookingHistoryTable = ({
  data,
  isLoading,
}: BookingHistoryTableProps) => {
  const navigate = useNavigate();

  // Setup columns
  const columns = useMemo<ColumnDef<BookingHistory>[]>(
    () => [
      {
        header: 'Passenger Name',
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: 'alphanumeric',
        accessorFn: (row) => row.user.account.displayName,
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
        header: 'Action',
        footer: (props) => props.column.id,
        cell: (info) => (
          <Button
            label="Edit"
            type="secondary"
            icon="IoPencilOutline"
            size="small"
            onClick={() =>
              navigate(`/booking-history/edit?id=${info.getValue()}`)
            }
          />
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
  if (!isLoading && !data.length) return <p>No leagues found</p>;

  return (
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
  );
};
