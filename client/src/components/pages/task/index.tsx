'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { ITaskResponse } from '@/types';
import { useUserInfo } from '@/context';
import { useWindowWidth } from '@/hooks';
import { Clip, Comment, Info, SubMenu } from '@/assets/icons';
import {
  Accordion,
  TitleTask,
  ButtonBack,
  EditorTask,
  Attachments,
  showMessage,
  CommentEditor,
  TitleTaskSection,
} from '@/components';

import { getStyles } from './style';
import { CommentsProvider } from './model';
import { TaskDetails } from './task-details';
import { ToolsMenu } from './tools-drop-menu';

import { routes } from '@/constants';

interface ITaskProps {
  boardId: string;
  error?: string | null;
  task: ITaskResponse | null;
}

export const Task = ({ task, boardId, error }: ITaskProps) => {
  const router = useRouter();

  const { isManager } = useUserInfo();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const text = useTranslations('taskPage');

  const { isLaptop } = useWindowWidth();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const styles = getStyles({ isVisible });

  useEffect(() => {
    if (!task) {
      if (error) {
        showMessage.error(error);
      }

      router.push(`${routes.managerDashboard}/${boardId}`);
    }
  }, [error, task, router]);

  if (!task) {
    return null;
  }

  return (
    <div className={styles.section}>
      <ButtonBack title={task.boardTitle} />
      <section className={styles.wrapperTitle}>
        <TitleTask titleTask={task.title} taskId={task.id} />
        <ToolsMenu taskId={task.id} />
      </section>

      <section className={`${styles.subSection} relative`}>
        <Accordion
          icon={Info}
          initialState={isOpen}
          title={text('details.title')}
          classNameWrapper={styles.accordion}
          classNameTitle="text-[20px] uppercase"
          setVisible={() => setIsOpen((prev) => !prev)}
        >
          <TaskDetails isClosed={!isOpen} task={task} boardId={boardId} />
        </Accordion>
        {isLaptop && (
          <>
            <TitleTaskSection icon={Info} title={text('details.title')} />

            <TaskDetails task={task} boardId={boardId} />
          </>
        )}
      </section>

      <section className={styles.subSection}>
        <TitleTaskSection icon={SubMenu} title={text('taskDescription.title')} />
        <EditorTask taskId={task.id} taskDescription={task.description} />
        {(task.attachment.length > 0 || isManager) && (
          <>
            <TitleTaskSection icon={Clip} title={text('attachments.title')} className={styles.subTitle} />
            <Attachments taskId={task.id} fileList={task.attachment} />
          </>
        )}
        <TitleTaskSection icon={Comment} title={text('comments.title')} className={styles.subTitle} />
        <CommentsProvider taskId={task.id} initialComments={task.comments}>
          <CommentEditor />
        </CommentsProvider>
      </section>
    </div>
  );
};
