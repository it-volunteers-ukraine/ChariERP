'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { Input, Pagination } from '@/components';
import { Calendar, Triangle } from '@/assets/icons';

import { data } from './mock';
import { RowItem } from './row-item';

const TableRequests = () => {
  const path = usePathname();
  const table = useTranslations('table');

  const [page, setPage] = useState(1);

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
          <div className="flex items-center gap-2 truncate">
            <span className="text-lg leading-[22px] font-robotoCondensed">{table('organizationName')}</span>
            <Triangle className=" text-midGray" />
          </div>

          <div className="flex items-center gap-2 justify-center">
            <span className="text-lg leading-[22px] font-robotoCondensed">{table('EDRPOU')}</span>
            <Triangle className="text-midGray" />
          </div>

          <div className="text-lg leading-[22px] text-center font-robotoCondensed">{table('document')}</div>

          <div className="flex items-center gap-2 justify-center">
            <Calendar className="text-midGray" width={16} height={16} />
            <span className="text-lg leading-[22px] font-robotoCondensed">{table('creationDate')}</span>
            <Triangle className="text-midGray" />
          </div>

          <div />
        </div>

        <div className="text-midGray grid gap-4 grid-cols-1 tablet:grid-cols-2 tablet:gap-6 laptop:block laptop:gap-0">
          {data.map((item) => (
            <RowItem key={item.id} item={item} path={path} />
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

export { TableRequests };
