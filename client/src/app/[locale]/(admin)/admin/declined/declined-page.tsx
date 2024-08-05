'use client';

import { useEffect, useState } from 'react';

import { IOrganization } from '@/types';
import { getDeclinedOrganizations } from '@/api';
import { Input, Pagination, TableRequests } from '@/components';

const pageSize = 10;

export const DeclinedPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  const getData = async (currentPage: number) => {
    try {
      const data = await getDeclinedOrganizations(currentPage);

      setOrganizations(data.organizations);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
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

        <TableRequests data={organizations} />
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
