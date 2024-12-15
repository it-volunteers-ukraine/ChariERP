'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Draggable } from '@hello-pangea/dnd';

import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings } from '@/assets/icons';
import { IUsers } from '@/components/participants/mock-user';

import { Participants } from '../participants';
import { ToolsDropMenu } from '../tools-drop-menu';

interface ITaskCard {
  id: string;
  idx: number;
  title: string;
  users: IUsers[];
  onDelete: (props: number) => void;
}

const duration = 300;

export const TaskCard = ({ id, idx, title, users, onDelete }: ITaskCard) => {
  const ref = useRef<HTMLDivElement>(null);
  const deleteMessage = useTranslations('button');

  const [isActive, setIsActive] = useState(false);

  const handlerClick = () => {
    setIsActive(false);

    setTimeout(() => onDelete(idx), duration);
  };

  useOutsideClick(() => setIsActive(false), ref);

  return (
    <Draggable draggableId={`${id}-${idx}`} index={idx}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative flex max-w-[222px] shrink-0 flex-col gap-3 overflow-hidden rounded-[8px] border border-arcticSky bg-white px-3 py-4"
        >
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
      )}
    </Draggable>
  );
};
