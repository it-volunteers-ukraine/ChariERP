'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import logger from '@/utils/logger/logger';

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
  const placeholder = useTranslations('inputs.placeholder');

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
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <>
      <div className="relative flex flex-1 flex-col overflow-y-auto rounded-b-lg bg-white pt-6">
        <Input
          type="search"
          name="requisitionSearch"
          label="requisitionSearch"
          placeholder={placeholder('searchTable')}
          wrapperClass="mb-6 px-4 tablet:pl-8 tablet:pr-0 laptop:pl-8 desktop:pl-8 desktopXl:pl-16 tablet:max-w-[405px] desktop:max-w-[541px]"
        />

        <div className={wrapper}>
          <div className="bg-white-second text-dim-gray laptop:grid laptop:grid-cols-table-organization sticky top-0 z-9 hidden gap-5 border-b border-[#A3A3A359] py-[14px] pl-3 select-none">
            <div
              onClick={() => requestSort('organizationName')}
              className="flex w-fit cursor-pointer items-center gap-2 truncate"
            >
              <span className="font-roboto-condensed text-lg leading-[22px]">{table('organizationName')}</span>
              <Triangle className={styles.organization} />
            </div>

            <div
              onClick={() => requestSort('EDRPOU')}
              className="flex w-fit cursor-pointer items-center gap-2 place-self-center"
            >
              <span className="font-roboto-condensed text-lg leading-[22px]">{table('EDRPOU')}</span>
              <Triangle className={styles.edrpou} />
            </div>

            <div
              onClick={() => requestSort('users')}
              className="flex w-fit cursor-pointer items-center gap-2 place-self-center"
            >
              <User className="text-mid-gray" width={14.5} height={14.5} />
              <Triangle className={styles.user} />
            </div>

            <div
              onClick={() => requestSort('approvalDate')}
              className="flex w-fit cursor-pointer items-center gap-2 place-self-center"
            >
              <Calendar className="text-mid-gray" width={16} height={16} />
              <span className="font-roboto-condensed text-lg leading-[22px]">{table('registrationDate')}</span>
              <Triangle className={styles.date} />
            </div>

            <div
              onClick={() => requestSort('email')}
              className="flex w-fit cursor-pointer items-center justify-start gap-2 pl-2"
            >
              <span className="font-roboto-condensed text-lg leading-[22px]">{table('email')}</span>
              <Triangle className={styles.email} />
            </div>
          </div>

          <div className="text-mid-gray tablet:grid-cols-2 tablet:gap-6 laptop:block laptop:gap-0 grid grid-cols-1 gap-4">
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
        className="desktop:ml-16 my-auto max-w-[440px]"
      />
    </>
  );
};
