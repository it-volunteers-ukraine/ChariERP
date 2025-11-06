'use client';

import { useTranslations } from 'next-intl';

import { onCopy } from '@/utils';
import { Copy } from '@/assets/icons';
import { EllipsisText, Input } from '@/components';

import { ParticipantsBoard } from '../participants-board';

interface IBoardTitleProps {
  title: string;
  boardId: string;
  paramValue: string;
  usersInTasks: string[];
  onChange: (name: string, value: string) => void;
}

export const BoardTitle = ({ title, paramValue, onChange, boardId, usersInTasks }: IBoardTitleProps) => {
  const massageCopyTranslations = useTranslations('board');

  return (
    <div className="tablet:mx-8 laptop:mb-7 laptop:gap-6 mx-4 mb-[10px] flex flex-col gap-3">
      <div className="laptop:pt-6 desktop:gap-[160px] flex justify-between gap-5 pt-3">
        <EllipsisText content={title}>
          <h2 className="font-scada text-light-blue tablet:text-[26px] tablet:leading-[30px] line-clamp-3 text-[20px] leading-[24px] font-bold">
            {title}
          </h2>
        </EllipsisText>

        <button
          className="text-light-blue hover:text-dark-blue active:text-green-active disabled:text-disabled flex min-w-10 cursor-pointer bg-transparent transition-all duration-300"
          onClick={(e) => onCopy(e, `${window.location.href}`, massageCopyTranslations('massageCopyTitle'))}
        >
          <Copy />
        </button>
      </div>

      <div className="laptop:flex-row flex flex-col gap-4">
        <div className="laptop:max-w-[254px]">
          <Input
            type="search"
            name="search"
            label="Search"
            value={paramValue}
            onChange={(e) => onChange('search', e as string)}
          />
        </div>

        <ParticipantsBoard boardId={boardId} usersInTasks={usersInTasks} />
      </div>
    </div>
  );
};
