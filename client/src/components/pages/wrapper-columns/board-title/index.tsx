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
    <div className="mx-4 mb-[10px] flex flex-col gap-3 tablet:mx-8 laptop:mb-7 laptop:gap-6">
      <div className="flex justify-between gap-5 pt-3 laptop:pt-6 desktop:gap-[160px]">
        <EllipsisText content={title}>
          <h2 className="line-clamp-3 font-scada text-[20px] font-bold leading-[24px] text-lightBlue tablet:text-[26px] tablet:leading-[30px]">
            {title}
          </h2>
        </EllipsisText>

        <button
          className="flex min-w-10 cursor-pointer bg-transparent text-lightBlue transition-all duration-300 hover:text-dark-blue active:text-greenActive disabled:text-disabled"
          onClick={(e) => onCopy(e, `${window.location.href}`, massageCopyTranslations('massageCopyTitle'))}
        >
          <Copy />
        </button>
      </div>

      <div className="flex flex-col gap-4 laptop:flex-row">
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
