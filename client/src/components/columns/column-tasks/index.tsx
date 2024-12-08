'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Draggable } from '@hello-pangea/dnd';

import { Delete, DotsSettings, Edit } from '@/assets/icons';
import { useOutsideClick } from '@/hooks';
import { ChildrenProps } from '@/types';
import { cn } from '@/utils';

import { ToolsDropMenu } from '../../tools-drop-menu';

import { getStyles } from './styles';

interface IColumnTasks {
  id: string;
  title: string;
  index: number;
  onDeleteColumn: (props: string) => void;
  onChangeTitle: (props: string) => void;
}

export const ColumnTasks = ({
  id,
  index,
  title,
  children,
  onChangeTitle,
  onDeleteColumn,
}: ChildrenProps<IColumnTasks>) => {
  const refInput = useRef<HTMLInputElement>(null);
  const translateBtn = useTranslations('button');

  const [value, setValue] = useState(title);
  const [isDisable, setIsDisable] = useState(true);
  const [isToolsMenu, setIsToolsMenu] = useState(false);

  const style = getStyles(isDisable);

  const handlerEdit = () => {
    setIsDisable(false);
    setIsToolsMenu(false);
    refInput.current?.focus();
  };

  const handlerDelete = () => {
    if (onDeleteColumn) onDeleteColumn(id);
  };

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlurChange = () => {
    if (!value && title) {
      setIsDisable(true);
      setValue(title);
      onChangeTitle(title);
    }
    setIsDisable(true);
  };

  useOutsideClick(() => setIsToolsMenu(false), refInput);

  useEffect(() => {
    if (!isDisable && refInput) {
      refInput.current?.focus();
    }
  }, [isDisable]);

  return (
    <Draggable draggableId={id} index={index}>
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
                onBlur={onBlurChange}
                className={style.input}
                placeholder="додати колонку"
                onChange={handlerInputChange}
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
              <button onClick={handlerEdit} className={style.btnTools}>
                {translateBtn('edit')}
                <Edit className="h-6 w-6" />
              </button>

              <button onClick={handlerDelete} className={style.btnTools}>
                {translateBtn('delete')}
                <Delete className="h-6 w-6" />
              </button>
            </ToolsDropMenu>
          </div>

          <div className="scroll-textarea flex flex-col gap-y-3 pr-1">{children}</div>

          <div className="pr-3">
            <button className={style.addTask}>
              <span className="text-2xl font-bold leading-none">+</span>

              <span className="text-sm leading-5">{translateBtn('addTask')}</span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};
