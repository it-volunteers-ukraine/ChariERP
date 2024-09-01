'use client';

import { useEffect, useState } from 'react';

import { getAdminOrganizationsAction } from '@/actions';
import { Input, Pagination, TableRequests } from '@/components';
import { IOrganization, RequestOrganizationStatus } from '@/types';

const pageSize = 10;

export const DeclinedPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  const getData = async (currentPage: number) => {
    try {
      const data = await getAdminOrganizationsAction({
        page: currentPage,
        filterStatus: RequestOrganizationStatus.DECLINED,
      });

      setOrganizations(data.results as IOrganization[]);
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

        <TableRequests data={organizations} getData={() => getData(page)} />
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
