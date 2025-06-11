'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Draggable } from '@hello-pangea/dnd';

import { cn } from '@/utils';
import { routes } from '@/constants';
import { useUserInfo } from '@/context';
import { useOutsideClick } from '@/hooks';
import { IUsersNormalizer } from '@/types';
import { Delete, DotsSettings } from '@/assets/icons';

import { showMessage } from '../toastify';
import { Participants } from '../participants';
import { ToolsDropMenu } from '../tools-drop-menu';

import { getStyles } from './styles';

interface ITaskCard {
  id: string;
  idx: number;
  title: string;
  boardId: string;
  columnId: string;
  isManager: boolean;
  hasNextTask: boolean;
  users?: IUsersNormalizer[];
  onDelete: (id: string) => void;
}

const duration = 300;

export const TaskCard = ({
  id,
  idx,
  title,
  boardId,
  onDelete,
  columnId,
  isManager,
  users = [],
  hasNextTask,
}: ITaskCard) => {
  const ref = useRef<HTMLDivElement>(null);
  const deleteMessage = useTranslations('button');
  const taskMessage = useTranslations('taskPage');

  const { _id } = useUserInfo();
  const userId = _id ? String(_id) : undefined;
  const isAccess = users.some((user) => user.id === userId);

  const [isActive, setIsActive] = useState(false);

  const style = getStyles(hasNextTask);

  const handleDots = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActive(true);
  };

  const handlerDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsActive(false);

    setTimeout(() => onDelete(id), duration);
  };

  useOutsideClick(() => setIsActive(false), ref);

  const handleClick = (e: React.MouseEvent) => {
    if (isAccess || isManager) {
      window.location.href = `${routes.managerDashboard}/${boardId}/${columnId}/${id}`;
    } else {
      e.preventDefault();
      e.stopPropagation();

      showMessage.error(taskMessage('noAccessToTask'));
    }
  };

  return (
    <Draggable draggableId={`${id}-${idx}`} index={idx}>
      {(provided, snapshot) => (
        <div
          onClick={handleClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(style.taskCard, snapshot.isDragging && style.taskCardDragging)}
        >
          <div className="flex items-start justify-between">
            <p className={style.title}>{title}</p>

            {isManager && (
              <>
                <button className={style.dotsButton} onClick={handleDots}>
                  <DotsSettings />
                </button>

                <ToolsDropMenu opened={isActive} onClose={() => setIsActive(false)} duration={duration}>
                  <button onClick={handlerDelete} className={style.deleteButton}>
                    <p>{deleteMessage('delete')}</p>
                    <div className={style.deleteIcon}>
                      <Delete />
                    </div>
                  </button>
                </ToolsDropMenu>
              </>
            )}
          </div>

          <Participants users={users} isTask />
        </div>
      )}
    </Draggable>
  );
};
