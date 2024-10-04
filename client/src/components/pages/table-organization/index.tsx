'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useSortableData } from '@/hooks';
import { useLoaderAdminPage } from '@/context';
import { Input, Pagination } from '@/components';
import { getAdminOrganizationsAction } from '@/actions';
import { Calendar, Triangle, User } from '@/assets/icons';
import { IOrganizationPageProps, RequestOrganizationStatus } from '@/types';

import { RowItem } from './row-item';
import { getStyles } from './styles';
import { getStylesTableWrapper } from '../styles';

const pageSize = 12;

export const TableOrganization = () => {
  const table = useTranslations('table');

  const [page, setPage] = useState(1);
  const { setIsLoading } = useLoaderAdminPage();
  const [totalRecords, setTotalRecords] = useState(1);
  const [organizations, setOrganizations] = useState<IOrganizationPageProps[]>([]);

  const { items, requestSort, sortConfig } = useSortableData(organizations);

  const styles = getStyles({
    date: sortConfig?.key === 'approvalDate' ? sortConfig?.direction : undefined,
    user: sortConfig?.key === 'users' ? sortConfig?.direction : undefined,
    email: sortConfig?.key === 'email' ? sortConfig?.direction : undefined,
    edrpou: sortConfig?.key === 'EDRPOU' ? sortConfig?.direction : undefined,
    organization: sortConfig?.key === 'organizationName' ? sortConfig?.direction : undefined,
  });

  const { wrapper } = getStylesTableWrapper({ isPagination: totalRecords > pageSize });

  const getData = async (currentPage: number) => {
    setIsLoading(true);

    try {
      const data = await getAdminOrganizationsAction({
        limit: pageSize,
        page: currentPage,
        populate: 'users',
        filterStatus: RequestOrganizationStatus.APPROVED,
      });

      setOrganizations(data.results as IOrganizationPageProps[]);
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
      <div className="relative pt-6 flex flex-col flex-1 bg-white overflow-y-auto rounded-b-lg shadow-dashboard">
        <Input
          type="search"
          name="requisitionSearch"
          label="requisitionSearch"
          wrapperClass="mb-6 px-6 tablet:pl-8 tablet:max-w-[373px]"
        />

        <div className={wrapper}>
          <div className="hidden laptop:grid laptop:grid-cols-tableOrganization gap-5 py-[14px] pl-3 text-dimGray bg-whiteSecond select-none sticky top-0 z-[9] border-b border-[#A3A3A359]">
            <div
              onClick={() => requestSort('organizationName')}
              className="flex items-center truncate gap-2 w-fit cursor-pointer"
            >
              <span className="text-lg leading-[22px] font-robotoCondensed">{table('organizationName')}</span>
              <Triangle className={styles.organization} />
            </div>

            <div
              onClick={() => requestSort('EDRPOU')}
              className="flex items-center place-self-center gap-2 w-fit cursor-pointer"
            >
              <span className="text-lg leading-[22px] font-robotoCondensed">{table('EDRPOU')}</span>
              <Triangle className={styles.edrpou} />
            </div>

            <div
              onClick={() => requestSort('users')}
              className="flex items-center place-self-center gap-2 w-fit cursor-pointer"
            >
              <User className="text-midGray" width={14.5} height={14.5} />
              <Triangle className={styles.user} />
            </div>

            <div
              onClick={() => requestSort('approvalDate')}
              className="flex items-center place-self-center gap-2 w-fit cursor-pointer"
            >
              <Calendar className="text-midGray" width={16} height={16} />
              <span className="text-lg leading-[22px] font-robotoCondensed">{table('registrationDate')}</span>
              <Triangle className={styles.date} />
            </div>

            <div
              onClick={() => requestSort('email')}
              className="flex items-center justify-start gap-2 pl-2 w-fit cursor-pointer"
            >
              <span className="text-lg leading-[22px] font-robotoCondensed">{table('email')}</span>
              <Triangle className={styles.email} />
            </div>
          </div>

          <div className="text-midGray grid laptop:block grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6  laptop:gap-0">
            {items.map((item) => (
              <RowItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        current={page}
        onChange={setPage}
        pageSize={pageSize}
        total={totalRecords}
        className=" max-w-[440px] desktop:ml-11"
      />
    </>
  );
};
