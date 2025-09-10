'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  MRT_Row,
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleGlobalFilterButton,
} from 'material-react-table';

import { Delete } from '@/assets/icons';

import { data, header } from './mock';
import { ModalAdmin } from '../modals';
import { StaticImageData } from 'next/image';
import { CustomDownloadButton, CustomFiltersDeleteButton, CustomToggleFiltersButton } from './button';

export type Person = {
  id: number;
  name: string;
  save: string;
  unit: string;
  photo: string | StaticImageData;
  price: number;
  number: number;
  origin: string;
  category: string;
  financing: string;
  created_at: string;
  save_place: string;
  updated_at: string;
  description: string;
  arrival_date: string;
};

export const MaterialTable = () => {
  const t = useTranslations('materialTable');

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Person[]>(data);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const openDeleteModal = (id: number) => {
    setSelectedRowId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRowId === null) return;

    setDeleteItem((prev) => prev.filter((item) => item.id !== selectedRowId));
    setModalOpen(false);
    setSelectedRowId(null);
  };

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      ...header,
      {
        header: '',
        size: 100,
        id: 'delete',
        enableEditing: false,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ row }: { row: MRT_Row<Person> }) => (
          <Delete
            onClick={() => openDeleteModal(row.original.id)}
            className="h-[20px] w-[20px] cursor-pointer text-[#61B6DB]"
          />
        ),
      },
    ],
    [header],
  );

  const table = useMaterialReactTable({
    data: deleteItem,
    columns,
    enableEditing: true,
    enableSorting: false,
    enableTopToolbar: true,
    enablePagination: true,
    editDisplayMode: 'cell',
    enableColumnActions: true,
    paginationDisplayMode: 'pages',
    renderTopToolbarCustomActions: ({ table }) => {
      const hasActiveFilters = table.getState().columnFilters.length > 0;

      return hasActiveFilters ? <CustomFiltersDeleteButton table={table} /> : null;
    },

    renderToolbarInternalActions: ({ table }) => (
      <div className="flex items-center gap-3">
        <MRT_ToggleGlobalFilterButton table={table} />
        <CustomToggleFiltersButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
        <CustomDownloadButton table={table} />
      </div>
    ),
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
            width: '8px',
            margin: '2px',
            maxWidth: '40px',
            borderRadius: '8px',
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
        color: '#fff',
        padding: '16px',
        maxWidth: '100%',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        backgroundColor: '#61B6DB',
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
        '& .MuiTableSortLabel-root': {
          color: '#ffffff !important',
          '&.Mui-active': {
            color: '#ffffff !important',
          },
          '& .MuiSvgIcon-root': {
            color: '#ffffff !important',
          },
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
      <MaterialReactTable table={table} />
      <ModalAdmin
        isError={false}
        isLoading={false}
        isOpen={modalOpen}
        classNameBtn="min-w-[120px]"
        btnCancelText={t('remove.no')}
        onConfirm={handleConfirmDelete}
        btnConfirmText={t('remove.yes')}
        onClose={() => setModalOpen(false)}
        title={t('remove.confirmDeleteTitle')}
        content={t('remove.confirmDeleteContent')}
      />
    </div>
  );
};
