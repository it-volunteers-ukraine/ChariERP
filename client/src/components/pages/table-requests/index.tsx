'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { Input, Pagination } from '@/components';
import { Calendar, Triangle } from '@/assets/icons';
import { useSortableData, useWindowWidth } from '@/hooks';

import { data } from './mock';
import { RowItem } from './row-item';
import { getStyles } from './styles';

export const TableRequests = () => {
  const path = usePathname();
  const table = useTranslations('table');
  const { isLaptop } = useWindowWidth();

  const { items, requestSort, sortConfig } = useSortableData(data);

  const [page, setPage] = useState(1);

  const styles = getStyles({
    organization: sortConfig?.key === 'organizationName' ? sortConfig?.direction : undefined,
    edrpou: sortConfig?.key === 'EDRPOU' ? sortConfig?.direction : undefined,
    date: sortConfig?.key === 'date' ? sortConfig?.direction : undefined,
  });

  return (
    <div className="relative pt-6 flex flex-col flex-1 bg-white overflow-y-auto">
      <Input
        type="search"
        name="requisitionSearch"
        label="requisitionSearch"
        wrapperClass="mb-6 px-6 tablet:pl-8 tablet:max-w-[373px]"
      />

      <div className="relative px-4 tablet:px-8 h-lvh overflow-x-auto rounded-lg shadow-dashboard scroll-blue">
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
            onClick={() => requestSort('date')}
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
            <RowItem key={item.id} item={item} path={path} isLaptop={isLaptop} />
          ))}
        </div>
      </div>

      <Pagination
        total={10000}
        current={page}
        pageSize={100}
        onChange={setPage}
        className="py-16 max-w-[440px] my-auto desktop:ml-11"
      />
    </div>
  );
};
