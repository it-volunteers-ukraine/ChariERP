import { MRT_TableInstance } from 'material-react-table';
import { IconButton, Tooltip } from '@mui/material';
import { unparse } from 'papaparse';

import { Download } from '@/assets/icons';

import { Person } from '..';

type CustomDownloadButtonProps = {
  table: MRT_TableInstance<Person>;
};

export const CustomDownloadButton = ({ table }: CustomDownloadButtonProps) => {
  const handleExportCSV = () => {
    const csvData = table.getRowModel().rows.map((row) => row.original);
    const csv = unparse(csvData);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Tooltip title="Export CSV" arrow>
      <IconButton onClick={handleExportCSV} sx={{ color: 'black' }}>
        <Download className="text-white" />
      </IconButton>
    </Tooltip>
  );
};
