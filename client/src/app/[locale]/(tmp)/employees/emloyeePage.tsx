'use client';
import { useEffect, useState } from 'react';

import { employeeCardArray } from '@/mock';
import { Button, EmployeeCard, Input, LoaderComponent, Pagination } from '@/components';

export default function EmployeesFunctionalPage() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    await setTimeout(() => setIsLoading(false), 44000);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="relative h-full flex flex-col justify-between">
      <LoaderComponent isLoading={isLoading} />

      <div className="w-full p-[20px_16px] tablet:p-[24px_32px_32px] desktop:p-[24px_32px_24px_36px] desktopXl:desktop:p-[24px_36px]">
        <div className="w-full flex flex-col gap-4 pb-5 tablet:flex-row tablet:gap-8 tablet:pb-6 laptop:justify-between">
          <Input type="search" placeholder="Search" name="as" label="Search" wrapperClass="laptop:max-w-[373px]" />

          <Button text="+ Add employee" styleType="primary" className="w-full tablet:max-w-[216px]" />
        </div>

        <div className="w-full flex flex-wrap gap-6">
          {employeeCardArray.map((card) => (
            <EmployeeCard
              key={card.name}
              {...card}
              className="tablet:max-w-[calc(50%-12px)] desktop:max-w-[calc(33%-15px)]"
            />
          ))}
        </div>
      </div>

      <div className="bg-whiteSecond py-[22px] px-[20px]">
        <Pagination total={10000} current={page} pageSize={100} onChange={setPage} />
      </div>
    </div>
  );
}
