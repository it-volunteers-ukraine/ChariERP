'use client';

import { useMemo } from 'react';
import { type MRT_ColumnDef, useMaterialReactTable, MaterialReactTable as Table } from 'material-react-table';

import { Delete } from '@/assets/icons';

import { data, header } from './mock';

export type Person = {
  number: number;
  id: number;
  photo: string;
  name: string;
  category: string;
  unit: string;
  save: string;
  save_place: string;
  origin: string;
  financing: string;
  arrival_date: string;
  price: number;
  sum: number;
  created_at: string;
  updated_at: string;
  description: string;
};

export const MaterialReactTable = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      ...header,
      {
        id: 'delete',
        header: '',
        size: 100,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ row }: { row: any }) => (
          <Delete onClick={() => console.log(row.index)} className="h-[20px] w-[20px] cursor-pointer text-[#61B6DB]" />
        ),
      },
    ],
    [header],
  );

  const table = useMaterialReactTable({
    data,
    columns,
    enableSorting: false,
    enableTopToolbar: true,
    enableColumnActions: true,
    paginationDisplayMode: 'pages',
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    muiTablePaperProps: {
      sx: {
        backgroundColor: 'white !important',
        '& .MuiTableContainer-root': {
          '&::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#ffffff',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#61B6DB',
            borderRadius: '8px',
            width: '8px',
            margin: '2px',
            maxWidth: '40px',
            border: '3px solid #ffffff',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#cccccc',
          },
        },
      },
    },
    muiTableHeadProps: {
      sx: {
        '& .MuiTableRow-root': {
          backgroundColor: 'transparent !important',
          justifyContent: 'space-between !important',
        },
        '& .MuiBox-root': {
          justifyContent: 'space-between !important',
        },
      },
    },
    muiTopToolbarProps: {
      sx: {
        height: '64px',
        backgroundColor: '#61B6DB',
        color: '#fff',
        padding: '16px',
        maxWidth: '100%',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        '& .MuiSvgIcon-root': {
          color: '#ffffff',
        },
      },
    },
    muiTableHeadCellProps: () => ({
      sx: {
        backgroundColor: '#61B6DB',
        color: '#fff',
        fontWeight: 'medium',
        fontSize: '18px',
        height: '56px',
        overflow: 'hidden',
        paddingTop: '16px !important',
        justifyContent: 'space-between !important',
        '& .MuiSvgIcon-root': {
          color: '#ffffff !important',
        },
      },
    }),
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        verticalAlign: 'top',
        backgroundColor: row.index % 2 === 0 ? '#E8EEFB' : '#fff',
      },
    }),
  });

  return (
    <div className="m-[30px] overflow-hidden rounded-t-[14px]">
      <Table table={table} />
    </div>
  );
};
