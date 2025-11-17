'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { IOrganization } from '@/types';
import { Calendar, Triangle } from '@/assets/icons';
import { useSortableData, useWindowWidth } from '@/hooks';

import { RowItem } from './row-item';
import { getStyles } from './styles';
import { getStylesTableWrapper } from '../styles';

interface ITableRequestsProps {
  getData: () => void;
  data: IOrganization[];
  isPagination?: boolean;
}

export const TableRequests = ({ data, getData, isPagination }: ITableRequestsProps) => {
  const path = usePathname();
  const table = useTranslations('table');
  const { isLaptop } = useWindowWidth();

  const { items, requestSort, sortConfig } = useSortableData(data);

  const styles = getStyles({
    edrpou: sortConfig?.key === 'EDRPOU' ? sortConfig?.direction : undefined,
    date: sortConfig?.key === 'requestDate' ? sortConfig?.direction : undefined,
    organization: sortConfig?.key === 'organizationName' ? sortConfig?.direction : undefined,
  });

  const { wrapper } = getStylesTableWrapper({ isPagination });

  return (
    <div className={wrapper}>
      <div className={styles.header}>
        <div
          onClick={() => requestSort('organizationName')}
          className="flex w-fit cursor-pointer items-center gap-2 truncate"
        >
          <span className="font-roboto-condensed text-lg leading-[22px]">{table('organizationName')}</span>
          <Triangle className={styles.organization} />
        </div>

        <div
          onClick={() => requestSort('EDRPOU')}
          className="flex w-fit cursor-pointer items-center gap-2 place-self-center"
        >
          <span className="font-roboto-condensed text-lg leading-[22px]">{table('EDRPOU')}</span>
          <Triangle className={styles.edrpou} />
        </div>

        <div className="font-roboto-condensed text-center text-lg leading-[22px]">{table('document')}</div>

        <div
          onClick={() => requestSort('requestDate')}
          className="flex w-fit cursor-pointer items-center gap-2 place-self-center"
        >
          <Calendar className="text-mid-gray" width={16} height={16} />
          <span className="font-roboto-condensed text-lg leading-[22px]">{table('creationDate')}</span>
          <Triangle className={styles.date} />
        </div>

        <div />
      </div>

      <div className="text-mid-gray tablet:grid-cols-2 tablet:gap-6 laptop:block laptop:gap-0 grid grid-cols-1 gap-4">
        {items.map((item) => (
          <RowItem key={item.id} item={item} path={path} isLaptop={isLaptop} getData={getData} />
        ))}
      </div>
    </div>
  );
};
