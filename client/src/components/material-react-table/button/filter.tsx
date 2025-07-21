import { MRT_TableInstance } from 'material-react-table';
import { IconButton, Tooltip } from '@mui/material';

import { Filter } from '@/assets/icons';

import { Person } from '..';

type ToggleFiltersProps = {
  table: MRT_TableInstance<Person>;
};

export const CustomToggleFiltersButton = ({ table }: ToggleFiltersProps) => {
  const isFiltersOpen = table.getState().showColumnFilters ?? false;

  const toggleFilters = () => {
    table.setShowColumnFilters(!isFiltersOpen);
  };

  return (
    <Tooltip title="Show/hide filters" arrow>
      <IconButton onClick={toggleFilters} aria-pressed={isFiltersOpen} sx={{ color: 'black' }}>
        <Filter />
      </IconButton>
    </Tooltip>
  );
};
