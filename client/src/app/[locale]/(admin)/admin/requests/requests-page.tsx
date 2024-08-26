'use client';

import { useEffect, useState } from 'react';

import { IOrganization } from '@/types';
import { getPendingOrganizations } from '@/api';
import { Input, LoaderPage, Pagination, TableRequests } from '@/components';

const pageSize = 10;

export const RequestsPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  const getData = async (currentPage: number) => {
    setIsLoading(true);

    try {
      const data = await getPendingOrganizations({ page: currentPage });

      setOrganizations(data.organizations);
      setTotalPages(data.totalPages);
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
      <div className="relative pt-6 flex flex-col flex-1 bg-white rounded-b-lg shadow-dashboard overflow-y-auto">
        <Input
          type="search"
          name="requisitionSearch"
          label="requisitionSearch"
          wrapperClass="mb-6 px-6 tablet:pl-8 tablet:max-w-[373px]"
        />

        <LoaderPage isLoading={isLoading}>
          <TableRequests data={organizations} getData={() => getData(page)} />
        </LoaderPage>
      </div>

      <Pagination
        current={page}
        total={totalPages}
        onChange={setPage}
        pageSize={pageSize}
        className="py-16 max-w-[440px] my-auto desktop:ml-11"
      />
    </>
  );
};
