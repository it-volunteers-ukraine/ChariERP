import { MRT_TableInstance } from 'material-react-table';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/button';

import { Person } from '..';

type CustomFiltersDeleteButtonProps = {
  table: MRT_TableInstance<Person>;
};

export const CustomFiltersDeleteButton = ({ table }: CustomFiltersDeleteButtonProps) => {
  const t = useTranslations('materialTable');

  return (
    <Button
      type="button"
      styleType="red"
      text={t('clearFilters')}
      className="min-w-[150px]"
      onClick={() => table.resetColumnFilters()}
    />
  );
};
