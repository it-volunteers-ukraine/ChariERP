'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings } from '@/assets/icons';
import { Participants } from '@/components/participants';
import { ToolsDropMenu } from '@/components/tools-drop-menu';
import { IUsers } from '@/components/participants/mock-user';

interface ITaskCard {
  id: string;
  title: string;
  users: IUsers[];
  onDelete: (props: string) => void;
}

const duration = 300;

export const TaskCard = ({ id, title, users, onDelete }: ITaskCard) => {
  const ref = useRef<HTMLDivElement>(null);
  const deleteMessage = useTranslations('button');

  const [isActive, setIsActive] = useState(false);

  const handlerClick = () => {
    setIsActive(false);

    setTimeout(() => onDelete(id), duration);
  };

  useOutsideClick(ref, () => setIsActive(false));

  return (
    <div className="relative flex max-w-[222px] flex-col gap-3 overflow-hidden rounded-[8px] border border-arcticSky bg-white px-3 py-4">
      <div className="flex items-start justify-between">
        <p className="line-clamp-2 max-w-[170px] hyphens-auto font-roboto text-[14px] leading-[20px]">{title}</p>

        <button
          className="rounded transition duration-300 ease-in-out hover:bg-arcticSky"
          onClick={() => setIsActive(true)}
        >
          <DotsSettings />
        </button>

        <ToolsDropMenu opened={isActive} onClose={() => setIsActive(false)} duration={duration}>
          <button
            className="flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition duration-300 ease-in-out hover:bg-arcticSky"
            onClick={handlerClick}
          >
            <p>{deleteMessage('delete')}</p>

            <div className="h-6 w-6 text-comet">
              <Delete />
            </div>
          </button>
        </ToolsDropMenu>
      </div>

      <Participants users={users} small />
    </div>
  );
};
