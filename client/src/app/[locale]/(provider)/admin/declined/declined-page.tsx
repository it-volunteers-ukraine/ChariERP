'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useLoaderAdminPage } from '@/context';
import { getAdminOrganizationsAction } from '@/actions';
import { Input, Pagination, TableRequests } from '@/components';
import { IOrganization, RequestOrganizationStatus } from '@/types';

const pageSize = 12;

export const DeclinedPage = () => {
  const [page, setPage] = useState(1);
  const { setIsLoading } = useLoaderAdminPage();
  const [totalRecords, setTotalRecords] = useState(1);
  const placeholder = useTranslations('inputs.placeholder');
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  const getData = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const data = await getAdminOrganizationsAction({
        limit: pageSize,
        page: currentPage,
        filterStatus: RequestOrganizationStatus.DECLINED,
      });

      setOrganizations(data.results as IOrganization[]);
      setTotalRecords(data.totalItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <>
      <div className="relative flex flex-1 flex-col rounded-b-lg bg-white pt-6 shadow-dashboard">
        <Input
          type="search"
          name="requisitionSearch"
          label="requisitionSearch"
          placeholder={placeholder('searchTable')}
          wrapperClass="mb-6 px-4 tablet:pl-8 tablet:pr-0 tablet:max-w-[405px] desktop:max-w-[541px]"
        />

        <TableRequests data={organizations} getData={() => getData(page)} isPagination={totalRecords > pageSize} />
      </div>

      <Pagination
        current={page}
        onChange={setPage}
        pageSize={pageSize}
        total={totalRecords}
        className="my-auto max-w-[440px] py-16 desktop:ml-11"
      />
    </>
  );
};
