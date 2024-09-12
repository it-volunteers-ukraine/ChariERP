'use client';

import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';

import { routes } from '@/constants';
import { dateFormat, onCopy } from '@/utils';
import { RowItemOrgProps } from '@/types';
import { Copy, User } from '@/assets/icons';

export const RowItem = ({ item }: RowItemOrgProps) => {
  const locale = useLocale();
  const router = useRouter();
  const table = useTranslations('table');
  const messagesCopy = useTranslations('copy');

  const handleRowClick = () => {
    const selection = document.getSelection();

    if (!selection || !selection.toString()) {
      router.push(`${routes.organizations}/${item.id}`);
    }
  };

  return (
    <div
      onClick={handleRowClick}
      className="grid grid-cols-[auto, auto] laptop:grid-cols-tableOrganization laptop:items-center laptop:gap-5 p-3 laptop:py-[13px] laptop:pl-3 laptop:pr-0 hover:bg-superBlue border laptop:border-t-0 laptop:border-x-0 laptop:border-b rounded-2xl laptop:rounded-none border-[#A3A3A359] cursor-pointer transition-all duration-300"
    >
      <div className="col-span-2 laptop:col-auto text-lg leading-[22px] font-robotoCondensed truncate overflow-hidden whitespace-nowrap">
        {item.organizationName}
      </div>

      <span className="mt-6 laptop:mt-0 laptop:hidden text-lg leading-[22px] font-robotoCondensed">
        {table('EDRPOU')}
      </span>

      <div className="mt-6 laptop:mt-0 flex items-center justify-end laptop:justify-center gap-1 text-sm">
        <span className="text-lg leading-[22px] font-robotoCondensed truncate overflow-hidden whitespace-nowrap">
          {item.EDRPOU}
        </span>

        <Copy
          width={24}
          height={24}
          className="cursor-pointer flex-shrink-0 text-lightBlue"
          onClick={(e: MouseEvent<SVGSVGElement>) => onCopy(e, item.EDRPOU, messagesCopy('messages'))}
        />
      </div>

      <div className="mt-6 laptop:mt-0 laptop:hidden text-lg leading-[22px] laptop:text-center font-robotoCondensed">
        {format(parseISO(item.dateOfRegistration.toString()), dateFormat[locale])}
      </div>

      <div className="flex items-center justify-end laptop:justify-center mt-6 laptop:mt-0">
        <span className="text-midGray">{item.users}</span>

        <div className="flex justify-center items-center laptop:hidden w-[24px] h-[24px]">
          <User className="text-midGray" width={14.5} height={14.5} />
        </div>
      </div>

      <div className="mt-6 laptop:mt-0 hidden laptop:block text-lg leading-[22px] font-robotoCondensed laptop:text-center">
        {format(parseISO(item.dateOfRegistration.toString()), dateFormat[locale])}
      </div>

      <span className="laptop:hidden mt-6 text-lg leading-[22px] font-robotoCondensed">{table('email')}</span>

      <div className="laptop:col-auto mt-6 laptop:pl-2 laptop:mt-0">
        <div className="flex justify-end laptop:justify-between gap-2">
          <span className="max-w-[200px] truncate">{item.email}</span>

          <div className="flex justify-center laptop:min-w-[40px]">
            <Copy
              width={24}
              height={24}
              className="cursor-pointer flex-shrink-0 text-lightBlue"
              onClick={(e: MouseEvent<SVGSVGElement>) => onCopy(e, item.email, messagesCopy('messages'))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
