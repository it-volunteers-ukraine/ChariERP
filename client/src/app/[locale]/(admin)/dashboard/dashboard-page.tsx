'use client';
import { useState } from 'react';

import { Input, Pagination } from '@/components';
import { Calendar, Triangle } from '@/assets/icons';

import { data } from './mock';
import { RowItem } from './row-item';

const DashboardPage = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="relative pt-6 flex flex-col flex-1 bg-white overflow-y-auto">
      <Input type="search" name="requisitionSearch" label="requisitionSearch" wrapperClass="mb-6 pl-8 max-w-[373px]" />

      <div className="relative px-8 h-lvh overflow-x-auto rounded-lg shadow-dashboard scroll-blue">
        <div className="grid grid-cols-tableRequests gap-5 py-[14px] pl-3 text-dimGray bg-whiteSecond select-none sticky top-0 z-10 border-b border-[#A3A3A359] ">
          <div className="flex items-center gap-2 truncate">
            <span className="text-lg leading-[22px] font-robotoCondensed">Назва Організації</span>
            <Triangle className=" text-midGray" />
          </div>

          <div className="flex items-center gap-2 justify-center">
            <span className="text-lg leading-[22px] font-robotoCondensed">ЄДРПОУ</span>
            <Triangle className="text-midGray" />
          </div>

          <div className="text-lg leading-[22px] text-center font-robotoCondensed">Документ</div>

          <div className="flex items-center gap-2 justify-center">
            <Calendar className="text-midGray" width={16} height={16} />
            <span className="text-lg leading-[22px] font-robotoCondensed">Подачі</span>
            <Triangle className="text-midGray" />
          </div>

          <div />
        </div>

        <div className="divide-y divide-[#A3A3A359] text-midGray">
          {data.map((item) => (
            <RowItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Pagination
        total={10000}
        current={page}
        pageSize={100}
        onChange={setPage}
        className="py-16 max-w-[440px] my-auto"
      />
    </div>
  );
};

export { DashboardPage };
