import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings } from '@/assets/icons';
import { Participants } from '@/components/participants';
import { ToolsDropMenu } from '@/components/tools-drop-menu';
import { IUsers } from '@/components/participants/mock-user';

interface ICard {
  id: string;
  title: string;
  users: IUsers[];
  onDelete: (props: string) => void;
}

export const Card = ({ id, title, users, onDelete }: ICard) => {
  const ref = useRef<HTMLDivElement>(null);
  const deleteMessage = useTranslations('button');

  const duration = 150;

  const [isActive, setIsActive] = useState<boolean>(false);

  const handlerClick = () => {
    setIsActive(false);

    setTimeout(() => onDelete(id), duration);

    return;
  };

  useOutsideClick(ref, () => setIsActive(false));

  return (
    <div className="relative flex max-w-[222px] flex-col gap-3 overflow-hidden rounded-[8px] border border-arcticSky bg-white px-3 py-4">
      <div className="flex items-start justify-between">
        <p className="line-clamp-2 max-w-[170px] hyphens-auto font-roboto text-[14px] leading-[20px]">{title}</p>

        <button onClick={() => setIsActive(true)}>
          <DotsSettings />
        </button>

        <ToolsDropMenu opened={isActive} onClose={() => setIsActive(false)} duration={duration}>
          <button
            className="flex w-full items-center justify-between gap-x-3 rounded-[8px] p-2 font-roboto text-sm transition duration-300 ease-in-out"
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
