'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Draggable } from '@hello-pangea/dnd';

import { cn } from '@/utils';
import { routes } from '@/constants';
import { ChildrenProps } from '@/types';
import { useOutsideClick } from '@/hooks';
import { ToolsDropMenu } from '@/components';
import { Delete, DotsSettings, Edit } from '@/assets/icons';

import { getStyles } from './styles';

interface IColumnTasks {
  id: string;
  index: number;
  title: string;
  boardId: string;
  isManager: boolean;
  onDeleteColumn: (id: string) => void;
  onChangeTitle: ({ columnId, title }: { columnId: string; title: string }) => void;
  hasNextColumn: boolean;
}

const duration = 300;

export const ColumnTasks = ({
  id,
  index,
  title,
  boardId,
  children,
  isManager,
  hasNextColumn,
  onChangeTitle,
  onDeleteColumn,
}: ChildrenProps<IColumnTasks>) => {
  const refInput = useRef<HTMLInputElement>(null);
  const translateBtn = useTranslations('button');

  const [value, setValue] = useState(title);
  const [isDisable, setIsDisable] = useState(true);
  const [isToolsMenu, setIsToolsMenu] = useState(false);

  const style = getStyles(isDisable, hasNextColumn);

  const handleEdit = () => {
    setIsDisable(false);
    setIsToolsMenu(false);
    setTimeout(() => refInput.current?.focus(), 0);
  };

  const handleDelete = () => {
    setIsToolsMenu(false);
    setTimeout(() => onDeleteColumn(id), duration);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBlurChangeEdit();
    }
  };

  const onBlurChangeEdit = () => {
    if (value && title) {
      setIsDisable(true);
      onChangeTitle({ columnId: id, title: value });
    }
    setIsDisable(true);
  };

  useOutsideClick(() => setIsToolsMenu(false), refInput);

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!isManager}>
      {(provided, snapshot) => (
        <div
          id={id}
          className={cn(style.columnTask, snapshot.isDragging && style.columnDragging)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={style.titleBox}>
            {isDisable && !!value ? (
              <div className="w-[190px] border-[1px] border-transparent p-[8px_0px_8px_8px]">
                <p className={cn('line-clamp-1 break-all font-scada text-xl font-bold uppercase text-comet')}>
                  {value}
                </p>
              </div>
            ) : (
              <input
                type="text"
                value={value}
                ref={refInput}
                disabled={isDisable}
                className={style.input}
                onBlur={onBlurChangeEdit}
                onKeyUp={handleInputKeyUp}
                placeholder="додати колонку"
                onChange={handleInputChange}
              />
            )}

            {isManager && (
              <>
                <button className="rounded hover:bg-arcticSky" onClick={() => setIsToolsMenu(true)}>
                  <DotsSettings className="h-6 w-6" />
                </button>
                <ToolsDropMenu
                  animation="fade"
                  className="top-full"
                  opened={isToolsMenu}
                  onClose={() => setIsToolsMenu(false)}
                >
                  <button onClick={handleEdit} className={style.btnTools}>
                    {translateBtn('edit')}
                    <Edit className="h-6 w-6" />
                  </button>

                  <button onClick={handleDelete} className={style.btnTools}>
                    {translateBtn('delete')}
                    <Delete className="h-6 w-6" />
                  </button>
                </ToolsDropMenu>
              </>
            )}
          </div>

          <div className="scroll-textarea mb-2 flex max-h-[calc(100%-62px)] flex-col overflow-y-auto pr-1">
            {children}
          </div>

          <div className="pr-3">
            <Link href={`${routes.managerDashboard}/${boardId}/${id}/new-task`} className={style.addTask}>
              <span className="text-2xl font-bold leading-none">+</span>

              <span className="text-sm leading-5">{translateBtn('addTask')}</span>
            </Link>
          </div>
        </div>
      )}
    </Draggable>
  );
};
