import { useState } from 'react';

import * as XLSX from 'xlsx';
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

  const handleExportExcel = (): void => {
    const exportColumns = columns.filter((col) => col.accessorKey && col.header);

    const exportData: Record<string, ExportableValue>[] = table.getRowModel().rows.map((row) => {
      const obj: Record<string, ExportableValue> = {};

      exportColumns.forEach((col) => {
        const key = col.accessorKey as keyof Person;
        const header = col.header;
        const value = row.original[key];

        obj[header] = formatValueForExport(key, value);
      });

      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const colWidths = exportColumns.map((col) => {
      const header = col.header;

      let maxLength = header.length;

      exportData.forEach((row) => {
        const val = row[header];

        if (val) {
          const length = String(val).length;

          if (length > maxLength) maxLength = length;
        }
      });

      return { wch: maxLength + 1 };
    });

    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table');
    XLSX.writeFile(workbook, 'export.xlsx');
  };

  const handleExportPdf = async () => {
    const blob = await pdf(<PdfDocument columns={columns} data={data} />).toBlob();
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
        isOpen={isModalOpen}
        title="Експорт таблиці"
        onExportPdf={handleExportPdf}
        onExportExcel={handleExportExcel}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
