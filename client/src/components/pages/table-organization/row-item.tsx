'use client';

import { MouseEvent } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { routes } from '@/constants';
import { RowItemOrgProps } from '@/types';
import { Copy, User } from '@/assets/icons';
import { dateFormat, onCopy } from '@/utils';

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
      className="grid-cols-[auto, auto] grid cursor-pointer rounded-2xl border border-[#A3A3A359] p-3 transition-all duration-300 hover:bg-superBlue laptop:grid-cols-tableOrganization laptop:items-center laptop:gap-5 laptop:rounded-none laptop:border-x-0 laptop:border-b laptop:border-t-0 laptop:py-[13px] laptop:pl-3 laptop:pr-0"
    >
      <div className="col-span-2 overflow-hidden truncate whitespace-nowrap font-robotoCondensed text-xl leading-6 text-midGray laptop:col-auto laptop:text-lg laptop:leading-[22px]">
        {item.organizationName}
      </div>

      <span className="mt-6 font-robotoCondensed text-lg leading-[22px] text-dimGray laptop:mt-0 laptop:hidden">
        {table('EDRPOU')}
      </span>

      <div className="mt-6 flex items-center justify-end gap-1 text-sm laptop:mt-0 laptop:justify-center">
        <span className="overflow-hidden truncate whitespace-nowrap font-robotoCondensed text-lg leading-[22px]">
          {item.EDRPOU}
        </span>

        <Copy
          className="h-6 w-6 flex-shrink-0 cursor-pointer text-lightBlue transition duration-300 hover:text-dark-blue active:text-greenActive"
          onClick={(e: MouseEvent<SVGSVGElement>) =>
            onCopy<MouseEvent<SVGSVGElement>>(e, item.EDRPOU, messagesCopy('messages'))
          }
        />
      </div>

      <div className="mt-6 font-robotoCondensed text-lg leading-[22px] laptop:mt-0 laptop:hidden laptop:text-center">
        {item.approvalDate && format(new Date(item.approvalDate), dateFormat[locale])}
      </div>

      <div className="mt-6 flex items-center justify-end laptop:mt-0 laptop:justify-center">
        <span className="text-midGray">{item.users}</span>

        <div className="flex h-[24px] w-[24px] items-center justify-center laptop:hidden">
          <User className="text-midGray" width={14.5} height={14.5} />
        </div>
      </div>

      <div className="mt-6 hidden font-robotoCondensed text-lg leading-[22px] laptop:mt-0 laptop:block laptop:text-center">
        {item.approvalDate && format(new Date(item.approvalDate), dateFormat[locale])}
      </div>

      <span className="mt-6 font-robotoCondensed text-lg leading-[22px] text-dimGray laptop:hidden">
        {table('email')}
      </span>

      <div className="mt-6 laptop:col-auto laptop:mt-0 laptop:pl-2">
        <div className="flex justify-end gap-2 laptop:justify-between">
          <span className="max-w-[200px] truncate">{item.email}</span>

          <div className="flex justify-center laptop:min-w-[40px]">
            <Copy
              width={24}
              height={24}
              className="flex-shrink-0 cursor-pointer text-lightBlue"
              onClick={(e: MouseEvent<SVGSVGElement>) => onCopy(e, item.email, messagesCopy('messages'))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
