'use client';

import { format } from 'date-fns';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { onCopy } from '@/utils/helpers';
import { RowItemOrgProps } from '@/types';
import { Copy, User } from '@/assets/icons';
import { dateFormat, routes } from '@/constants';

export const RowItem = ({ item }: RowItemOrgProps) => {
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
      className="grid-cols-[auto, auto] hover:bg-super-blue laptop:grid-cols-table-organization laptop:items-center laptop:gap-5 laptop:rounded-none laptop:border-x-0 laptop:border-b laptop:border-t-0 laptop:py-[13px] laptop:pl-3 laptop:pr-0 grid cursor-pointer rounded-2xl border border-[#A3A3A359] p-3 transition-all duration-300"
    >
      <div className="font-roboto-condensed text-mid-gray laptop:col-auto laptop:text-lg laptop:leading-[22px] col-span-2 truncate overflow-hidden text-xl leading-6 whitespace-nowrap">
        {item.organizationName}
      </div>

      <span className="font-roboto-condensed text-dim-gray laptop:mt-0 laptop:hidden mt-6 text-lg leading-[22px]">
        {table('EDRPOU')}
      </span>

      <div className="laptop:mt-0 laptop:justify-center mt-6 flex items-center justify-end gap-1 text-sm">
        <span className="font-roboto-condensed truncate overflow-hidden text-lg leading-[22px] whitespace-nowrap">
          {item.EDRPOU}
        </span>

        <Copy
          className="text-light-blue hover:text-dark-blue active:text-green-active h-[22px] w-[22px] shrink-0 cursor-pointer transition duration-300 active:transition-none"
          onClick={(e: MouseEvent<SVGSVGElement>) =>
            onCopy<MouseEvent<SVGSVGElement>>(e, item.EDRPOU, messagesCopy('messages'))
          }
        />
      </div>

      <div className="font-roboto-condensed laptop:mt-0 laptop:hidden laptop:text-center mt-6 text-lg leading-[22px]">
        {item.approvalDate && format(new Date(item.approvalDate), dateFormat)}
      </div>

      <div className="laptop:mt-0 laptop:justify-center mt-6 flex items-center justify-end">
        <span className="text-mid-gray leading-[22px]">{item.users}</span>

        <div className="laptop:hidden flex h-[24px] w-[24px] items-center justify-center">
          <User className="text-mid-gray" width={14.5} height={14.5} />
        </div>
      </div>

      <div className="font-roboto-condensed laptop:mt-0 laptop:block laptop:text-center mt-6 hidden text-lg leading-[22px]">
        {item.approvalDate && format(new Date(item.approvalDate), dateFormat)}
      </div>

      <span className="font-roboto-condensed text-dim-gray laptop:hidden mt-6 text-lg leading-[22px]">
        {table('email')}
      </span>

      <div className="laptop:col-auto laptop:mt-0 laptop:pl-2 mt-6">
        <div className="laptop:justify-between flex justify-end gap-2">
          <span className="max-w-[200px] truncate leading-[22px]">{item.email}</span>

          <div className="laptop:min-w-[40px] flex justify-center">
            <Copy
              className="text-light-blue hover:text-dark-blue active:text-green-active h-[22px] w-[22px] shrink-0 cursor-pointer transition duration-300 active:transition-none"
              onClick={(e: MouseEvent<SVGSVGElement>) => onCopy(e, item.email, messagesCopy('messages'))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
