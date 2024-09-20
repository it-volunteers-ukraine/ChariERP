'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { normalizeUsers } from '@/utils';
import { useLoaderAdminPage, useUserInfo } from '@/context';
import { getAllUsersByOrganizationIdActions } from '@/actions';
import { IEmployeeCardProps } from '@/components/employee-card/types';
import { Button, EmployeeCard, Input, Pagination } from '@/components';

const recordsPerPage = 10;

function EmployeesPage() {
  const router = useRouter();
  const t = useTranslations();

  const { organizationId } = useUserInfo();
  const { setIsLoading } = useLoaderAdminPage();

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [data, setData] = useState<IEmployeeCardProps[] | []>([]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsersByOrganizationIdActions({
        page,
        limit: recordsPerPage,
        id: String(organizationId),
      });

      const users = JSON.parse(response.users);

      setData(normalizeUsers(users.results));
      setTotalItems(users.totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (organizationId) {
      loadData();
    }
  }, [page, organizationId]);

  const wrapper = clsx(
    'w-full bg-white p-[20px_16px] tablet:p-[24px_32px_32px] desktop:p-[24px_32px_24px_36px] desktopXl:desktop:p-[24px_36px]',
    {
      'min-h-[calc(100vh-160px)] desktop:min-h-[calc(100vh-192px)]': totalItems > recordsPerPage,
      'min-h-[calc(100vh-64px)] desktop:min-h-[calc(100vh-96px)]': totalItems <= recordsPerPage,
    },
  );

  return (
    <>
      <div className={wrapper}>
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
          {data.map((card, index) => (
            <EmployeeCard
              {...card}
              key={card.firstName + index}
              className="tablet:max-w-[calc(50%-12px)] desktop:max-w-[calc(33%-15px)]"
            />
          ))}
        </div>
      </div>

      <Pagination
        current={page}
        onChange={setPage}
        total={totalItems}
        pageSize={recordsPerPage}
        className="max-w-[320px] desktop:mx-0"
      />
    </>
  );
}

export { EmployeesPage };
