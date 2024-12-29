'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Draggable } from '@hello-pangea/dnd';

import { cn } from '@/utils';
import { routes } from '@/constants';
import { ChildrenProps } from '@/types';
import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings, Edit } from '@/assets/icons';

import { ToolsDropMenu } from '../../../tools-drop-menu';

import { getStyles } from './styles';

interface IColumnTasks {
  id: string;
  title: string;
  index: number;
  boardId: string;
  isManager: boolean;
  onDeleteColumn: (id: string) => void;
  onChangeTitle: ({ columnId, title }: { columnId: string; title: string }) => void;
}

export const ColumnTasks = ({
  id,
  index,
  title,
  boardId,
  children,
  isManager,
  onChangeTitle,
  onDeleteColumn,
}: ChildrenProps<IColumnTasks>) => {
  const refInput = useRef<HTMLInputElement>(null);
  const translateBtn = useTranslations('button');

  const [value, setValue] = useState(title);
  const [isDisable, setIsDisable] = useState(true);
  const [isToolsMenu, setIsToolsMenu] = useState(false);

  const style = getStyles(isDisable);

  const handleEdit = () => {
    setIsDisable(false);
    setIsToolsMenu(false);
    setTimeout(() => refInput.current?.focus(), 0);
  };

  const handleDelete = () => {
    if (onDeleteColumn) onDeleteColumn(id);
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
      setValue(title);
      onChangeTitle({ columnId: id, title });
    }
    setIsDisable(true);
  };

  useOutsideClick(() => setIsToolsMenu(false), refInput);

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!isManager}>
      {(provided) => (
        <div
          id={id}
          className={style.columnTask}
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

            <button className="rounded hover:bg-arcticSky" onClick={() => setIsToolsMenu(true)}>
              <DotsSettings className="h-6 w-6" />
            </button>

            <ToolsDropMenu
              className="top-full"
              opened={isToolsMenu}
              animationEnd="startCollapse"
              animationStart="startExpand"
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
          </div>

          <div className="scroll-textarea flex max-h-[calc(100%-62px)] flex-col gap-y-3 overflow-y-auto pr-1">
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
