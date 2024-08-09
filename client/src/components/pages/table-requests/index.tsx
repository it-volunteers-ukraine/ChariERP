'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { IOrganization } from '@/types';
import { Calendar, Triangle } from '@/assets/icons';
import { useSortableData, useWindowWidth } from '@/hooks';

import { RowItem } from './row-item';
import { getStyles } from './styles';

interface ITableRequestsProps {
  getData: () => void;
  data: IOrganization[];
}

export const TableRequests = ({ data, getData }: ITableRequestsProps) => {
  const path = usePathname();
  const table = useTranslations('table');
  const { isLaptop } = useWindowWidth();

  const { items, requestSort, sortConfig } = useSortableData(data);

  const styles = getStyles({
    date: sortConfig?.key === 'dateOfRegistration' ? sortConfig?.direction : undefined,
    edrpou: sortConfig?.key === 'EDRPOU' ? sortConfig?.direction : undefined,
    organization: sortConfig?.key === 'organizationName' ? sortConfig?.direction : undefined,
  });

  return (
    <div className="relative px-4 tablet:px-8 h-lvh overflow-x-auto scroll-blue">
      <div className="hidden laptop:grid laptop:grid-cols-tableRequests gap-5 py-[14px] pl-3 text-dimGray bg-whiteSecond select-none sticky top-0 z-[9] border-b border-[#A3A3A359]">
        <div
          onClick={() => requestSort('organizationName')}
          className="flex items-center truncate w-fit gap-2 cursor-pointer"
        >
          <span className="text-lg leading-[22px] font-robotoCondensed">{table('organizationName')}</span>
          <Triangle className={styles.organization} />
        </div>

        <div
          onClick={() => requestSort('EDRPOU')}
          className="flex items-center place-self-center gap-2 w-fit cursor-pointer"
        >
          <span className="text-lg leading-[22px] font-robotoCondensed">{table('EDRPOU')}</span>
          <Triangle className={styles.edrpou} />
        </div>

        <div className="text-lg leading-[22px] text-center font-robotoCondensed">{table('document')}</div>

        <div
          onClick={() => requestSort('dateOfRegistration')}
          className="flex items-center place-self-center gap-2 w-fit cursor-pointer"
        >
          <Calendar className="text-midGray" width={16} height={16} />
          <span className="text-lg leading-[22px] font-robotoCondensed">{table('creationDate')}</span>
          <Triangle className={styles.date} />
        </div>

        <div />
      </div>

      <div className="text-midGray grid laptop:block grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6 laptop:gap-0">
        {items.map((item) => (
          <RowItem key={item.id} item={item} path={path} isLaptop={isLaptop} getData={getData} />
        ))}
      </div>
    </div>
  );
};
