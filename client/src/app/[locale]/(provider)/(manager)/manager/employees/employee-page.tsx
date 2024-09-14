'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { employeeCardArray } from '@/mock';
import { useLoaderAdminPage } from '@/context';
import { Button, EmployeeCard, Input, Pagination } from '@/components';

function EmployeesPage() {
  const router = useRouter();
  const t = useTranslations();

  const [page, setPage] = useState(1);
  const { setIsLoading } = useLoaderAdminPage();

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const wrapperClass = clsx('relative bg-white h-full flex flex-col justify-between');

  return (
    <div className={wrapperClass}>
      <div className="w-full p-[20px_16px] tablet:p-[24px_32px_32px] desktop:p-[24px_32px_24px_36px] desktopXl:desktop:p-[24px_36px]">
        <div className="w-full flex flex-col gap-4 pb-5 tablet:flex-row tablet:gap-8 tablet:pb-6 laptop:justify-between">
          <Input
            type="search"
            label="Search"
            name="EmployeeSearch"
            wrapperClass="laptop:max-w-[373px]"
            placeholder={t('inputs.placeholder.search')}
          />

          <Button
            styleType="primary"
            text={t('employeesPage.btnAdd')}
            className="w-full tablet:max-w-[216px] uppercase"
            onClick={() => router.push(`${routes.employees}/create`)}
          />
        </div>

        <div className="w-full flex flex-wrap gap-6">
          {employeeCardArray.map((card, index) => (
            <EmployeeCard
              {...card}
              key={card.name + index}
              className="tablet:max-w-[calc(50%-12px)] desktop:max-w-[calc(33%-15px)]"
            />
          ))}
        </div>
      </div>

      <div className="bg-whiteSecond py-[22px] px-[20px] desktop:px-[32px]">
        <Pagination
          total={10000}
          current={page}
          pageSize={100}
          onChange={setPage}
          className="max-w-[320px] desktop:mx-0"
        />
      </div>
    </div>
  );
}

export { EmployeesPage };
