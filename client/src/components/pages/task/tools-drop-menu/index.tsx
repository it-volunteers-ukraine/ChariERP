import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { onCopy } from '@/utils';
import { Copy, Delete, DotsSettings } from '@/assets/icons';
import { ToolsDropMenu } from '@/components/tools-drop-menu';

import { useDeleteTask } from '../api';
import { useUserInfo } from '@/context';

interface ITitleTask {
  taskId: string;
}

const duration = 300;

export const ToolsMenu = ({ taskId }: ITitleTask) => {
  const { isManager } = useUserInfo();
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
      <button className="hover:bg-arctic-sky place-self-start rounded-sm" onClick={handleDots}>
        <DotsSettings />
      </button>

      <ToolsDropMenu
        animation="fade"
        opened={isActive}
        duration={duration}
        onClose={() => setIsActive(false)}
        className="right-0 bottom-0 h-fit w-[250px]"
      >
        <button
          className="font-roboto-condensed text-comet hover:bg-arctic-sky active:text-green-active disabled:text-disabled flex min-w-10 cursor-pointer justify-between bg-transparent p-2 text-base capitalize transition-all duration-300"
          onClick={handleCopy}
        >
          <p>{task('title.copy')}</p>

          <div className="text-comet h-6 w-6 scale-150">
            <Copy />
          </div>
        </button>

        {isManager && (
          <button
            onClick={handlerDelete}
            className="font-roboto-condensed text-comet hover:bg-arctic-sky flex justify-between rounded-sm p-2 text-base capitalize transition"
          >
            <p>{task('title.delete')}</p>

            <div className="text-comet h-6 w-6">
              <Delete />
            </div>
          </button>
        )}
      </ToolsDropMenu>
    </>
  );
};
