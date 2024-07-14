'use client';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { Copy, Doc } from '@/assets/icons';
import { Button, showMessage } from '@/components';

interface RowItemProps {
  item: {
    id: string;
    doc: string;
    date: string;
    EDRPOU: number;
    organizationName: string;
  };
}

const RowItem = ({ item }: RowItemProps) => {
  const router = useRouter();

  const handleRowClick = () => {
    const selection = document.getSelection();

    if (!selection || !selection.toString()) {
      router.push(`${routes.dashboard}/${item.id}`);
    }
  };

  const handleCopyClick = (e: MouseEvent<SVGElement>, text: number) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text.toString());
    showMessage.success('Copied to clipboard', { autoClose: 500 });
  };

  return (
    <div
      onClick={handleRowClick}
      className="grid grid-cols-tableRequests items-center gap-5 py-[13px] pl-3 hover:bg-superBlue transition-all duration-300 cursor-pointer"
    >
      <div className="text-lg leading-[22px] font-robotoCondensed truncate overflow-hidden whitespace-nowrap">
        {item.organizationName}
      </div>

      <div className="text-sm flex items-center justify-center space-x-2">
        <span className="text-lg leading-[22px] font-robotoCondensed truncate overflow-hidden whitespace-nowrap">
          {item.EDRPOU}
        </span>
        <Copy
          width={24}
          height={24}
          className="cursor-pointer flex-shrink-0 text-lightBlue"
          onClick={(e: MouseEvent<SVGSVGElement>) => handleCopyClick(e, item.EDRPOU)}
        />
      </div>

      <div className="flex items-center justify-center">
        <a
          download
          href={item.doc}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center"
        >
          <Doc width={24} height={24} />
        </a>
      </div>

      <div className="text-lg leading-[22px] font-robotoCondensed text-center">{item.date}</div>

      <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
        <Button isNarrow styleType="green" text="Accept" />
        <Button isNarrow styleType="red" text="Decline" />
      </div>
    </div>
  );
};

export { RowItem };
