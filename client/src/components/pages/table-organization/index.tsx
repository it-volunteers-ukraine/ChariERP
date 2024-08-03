'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useSortableData } from '@/hooks';
import { Input, Pagination } from '@/components';
import { Calendar, Triangle, User } from '@/assets/icons';

import { data } from './mock';
import { RowItem } from './row-item';
import { getStyles } from './styles';

export const TableOrganization = () => {
  const table = useTranslations('table');
  const { items, requestSort, sortConfig } = useSortableData(data);

  const [page, setPage] = useState(1);

  const styles = getStyles({
    organization: sortConfig?.key === 'organizationName' ? sortConfig?.direction : undefined,
    edrpou: sortConfig?.key === 'EDRPOU' ? sortConfig?.direction : undefined,
    date: sortConfig?.key === 'date' ? sortConfig?.direction : undefined,
    user: sortConfig?.key === 'user' ? sortConfig?.direction : undefined,
    email: sortConfig?.key === 'email' ? sortConfig?.direction : undefined,
  });

  return (
    <>
      <div className="relative pt-6 flex flex-col flex-1 bg-white overflow-y-auto rounded-b-lg shadow-dashboard">
        <Input
          type="search"
          name="requisitionSearch"
          label="requisitionSearch"
          wrapperClass="mb-6 px-6 tablet:pl-8 tablet:max-w-[373px]"
        />

        <div className="relative px-4 tablet:px-8 h-lvh overflow-x-auto scroll-blue">
          <div className="hidden laptop:grid laptop:grid-cols-tableOrganization gap-5 py-[14px] pl-3 text-dimGray bg-whiteSecond select-none sticky top-0 z-[9] border-b border-[#A3A3A359]">
            <div
              onClick={() => requestSort('organizationName')}
              className="flex items-center truncate gap-2 w-fit cursor-pointer"
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

            <div
              onClick={() => requestSort('user')}
              className="flex items-center place-self-center gap-2 w-fit cursor-pointer"
            >
              <User className="text-midGray" width={14.5} height={14.5} />
              <Triangle className={styles.user} />
            </div>

            <div
              onClick={() => requestSort('date')}
              className="flex items-center place-self-center gap-2 w-fit cursor-pointer"
            >
              <Calendar className="text-midGray" width={16} height={16} />
              <span className="text-lg leading-[22px] font-robotoCondensed">{table('registrationDate')}</span>
              <Triangle className={styles.date} />
            </div>

            <div
              onClick={() => requestSort('email')}
              className="flex items-center justify-start gap-2 pl-2 w-fit cursor-pointer"
            >
              <span className="text-lg leading-[22px] font-robotoCondensed">{table('email')}</span>
              <Triangle className={styles.email} />
            </div>
          </div>

          <div className="text-midGray grid laptop:block grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6  laptop:gap-0">
            {items.map((item) => (
              <RowItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        total={10000}
        current={page}
        pageSize={100}
        onChange={setPage}
        className="py-16 max-w-[440px] my-auto desktop:ml-11"
      />
    </>
  );
};
