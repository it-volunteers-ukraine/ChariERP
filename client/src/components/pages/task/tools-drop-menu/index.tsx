import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { onCopy } from '@/utils';
import { Copy, Delete, DotsSettings } from '@/assets/icons';
import { ToolsDropMenu } from '@/components/tools-drop-menu';

import { useDeleteTask } from '../api';

interface ITitleTask {
  taskId: string;
}

const duration = 300;

export const ToolsMenu = ({ taskId }: ITitleTask) => {
  const [isActive, setIsActive] = useState(false);

  const task = useTranslations('taskPage');
  const massageCopyTranslations = useTranslations('board');

  const { deleteTask } = useDeleteTask(taskId);

  const handleDots = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActive(true);
  };

  const handlerDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    deleteTask();
    setIsActive(false);
  };

  const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
    onCopy(e, `${window.location.href}`, massageCopyTranslations('massageCopyTitle'));
    setIsActive(false);
  };

  return (
    <>
      <button className="place-self-start rounded hover:bg-arcticSky" onClick={handleDots}>
        <DotsSettings />
      </button>

      <ToolsDropMenu
        animation="fade"
        opened={isActive}
        duration={duration}
        onClose={() => setIsActive(false)}
        className="bottom-0 right-0 h-fit w-[250px]"
      >
        <button
          className="flex min-w-10 cursor-pointer justify-between bg-transparent p-2 font-robotoCondensed text-base capitalize text-comet transition-all duration-300 hover:bg-arcticSky active:text-greenActive disabled:text-disabled"
          onClick={handleCopy}
        >
          <p>{task('title.copy')}</p>

          <div className="h-6 w-6 scale-150 text-comet">
            <Copy />
          </div>
        </button>

        <button
          onClick={handlerDelete}
          className="flex justify-between rounded p-2 font-robotoCondensed text-base capitalize text-comet transition hover:bg-arcticSky"
        >
          <p>{task('title.delete')}</p>

          <div className="h-6 w-6 text-comet">
            <Delete />
          </div>
        </button>
      </ToolsDropMenu>
    </>
  );
};
