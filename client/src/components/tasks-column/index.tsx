'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils';
import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings, Edit } from '@/assets/icons';

import { TaskCard } from '../task-card';
// import { showMessage } from '../toastify';
import { ToolsDropMenu } from '../tools-drop-menu';

import { getStyles } from './styles';
import { IDataCards } from '../task-card/mock';

interface ITasksColumn {
  id: string;
  title: string;
  tasks?: IDataCards[];
  idx?: number;
  onDeleteColumn?: (props: string) => void;
}

export const TasksColumn = ({ id, title, tasks, onDeleteColumn, idx }: ITasksColumn) => {
  const refInput = useRef<HTMLInputElement>(null);
  const translateBtn = useTranslations('button');

  const [value, setValue] = useState(title);
  const [dataTask, setDataTask] = useState(tasks);
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
      refInput.current?.blur();
    }
    setIsDisable(true);
  };

  useOutsideClick(refInput, () => setIsToolsMenu(false));

  useEffect(() => {
    if (!isDisable && refInput) {
      refInput.current?.focus();
    }
  }, [isDisable, value, dataTask]);

  return (
    <div id={id + idx} className={style.columTask}>
      <div className={style.titleBox}>
        {isDisable && !!value ? (
          <div className="w-[190px] border-[1px] border-transparent p-[8px_0px_8px_8px]">
            <p className={cn('line-clamp-1 break-all font-scada text-xl font-bold uppercase text-comet')}>
              {isDisable && !!value
                ? value
                : (() => {
                    setIsDisable(false);

                    return title;
                  })()}
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

      <div className="scroll-textarea flex max-h-[500px] flex-col gap-y-3 overflow-hidden overflow-y-scroll pr-1">
        {dataTask?.map((task, index: number) => {
          return (
            <TaskCard
              {...task}
              key={index}
              onDelete={(id) => setDataTask((prev) => prev?.filter((item) => item.id !== id))}
            />
          );
        })}
      </div>

      <div className="pr-3">
        <button className={style.addTask}>
          <span className="text-2xl font-bold leading-none">+</span>

          <span className="text-sm leading-5">{translateBtn('addTask')}</span>
        </button>
      </div>
    </div>
  );
};
