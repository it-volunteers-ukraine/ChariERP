'use client';

import { useEffect, useState } from 'react';

import { useLoaderAdminPage } from '@/context';
import { getAdminOrganizationsAction } from '@/actions';
import { Input, Pagination, TableRequests } from '@/components';
import { IOrganization, RequestOrganizationStatus } from '@/types';

const pageSize = 12;

export const RequestsPage = () => {
  const [page, setPage] = useState(1);
  const { setIsLoading } = useLoaderAdminPage();
  const [totalRecords, setTotalRecords] = useState(1);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  const getData = async (currentPage: number) => {
    setIsLoading(true);

    try {
      const data = await getAdminOrganizationsAction({
        limit: pageSize,
        page: currentPage,
        filterStatus: RequestOrganizationStatus.PENDING,
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
      <div className="relative pt-6 flex flex-col flex-1 bg-white rounded-b-lg shadow-dashboard">
        <Input
          type="search"
          name="requisitionSearch"
          label="requisitionSearch"
          wrapperClass="mb-6 px-6 tablet:pl-8 tablet:max-w-[373px]"
        />
        <TableRequests data={organizations} getData={() => getData(page)} isPagination={totalRecords > pageSize} />
      </div>

      <Pagination
        current={page}
        onChange={setPage}
        pageSize={pageSize}
        total={totalRecords}
        className="max-w-[440px] my-auto desktop:ml-11"
      />
    </>
  );
};
