import { useState } from 'react';

import { pdf } from '@react-pdf/renderer';
import { IconButton, Tooltip } from '@mui/material';
import { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';

import { Download } from '@/assets/icons';

import { Person } from '..';
import { ModalExport } from './export-modal';
import { PdfDocument } from './pdf-document';

type ExportableValue = string | number | boolean | null | undefined;

type Props = {
  data: Person[];
  table: MRT_TableInstance<Person>;
  columns: MRT_ColumnDef<Person>[];
};

export const CustomDownloadButton = ({ table, data, columns }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatValueForExport = (key: string, value: unknown): ExportableValue => {
    if (key === 'photos' && Array.isArray(value) && value.length > 0) {
      return value[0].url;
    }

    if (typeof value === 'object' && value !== null && key !== 'photos') {
      return JSON.stringify(value);
    }

    return value as ExportableValue;
  };

  const handleExportExcel = async (): Promise<void> => {
    const ExcelJS = await import('exceljs');

    const exportColumns = columns.filter((col) => col.accessorKey && col.header && col.accessorKey !== 'photos');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Table');

    worksheet.columns = exportColumns.map((col) => {
      return {
        header: col.header,
        key: col.accessorKey as string,
        width: 20,
      };
    });

    const exportData = table.getRowModel().rows.map((row) => {
      const obj: Record<string, ExportableValue> = {};

      exportColumns.forEach((col) => {
        const key = col.accessorKey as keyof Person;

        obj[key] = formatValueForExport(key, row.original[key]);
      });

      return obj;
    });

    worksheet.addRows(exportData);

    worksheet.columns.forEach((column) => {
      let maxLength = 0;

      if (column.header) {
        maxLength = column.header.length;
      }

      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 0;

        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'export.xlsx';
    link.click();
  };

  const handleExportPdf = async () => {
    const blob = await pdf(<PdfDocument columns={columns} data={data} hiddenColumns={['photos']} />).toBlob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'example.pdf';
    link.click();
  };

  return (
    <>
      <Tooltip title="Export to Excel/Pdf" arrow>
        <IconButton onClick={() => setIsModalOpen(true)}>
          <Download className="text-white" />
        </IconButton>
      </Tooltip>

      <ModalExport
        title="Експорт таблиці"
        isOpen={isModalOpen}
        onExportPdf={handleExportPdf}
        onExportExcel={handleExportExcel}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
