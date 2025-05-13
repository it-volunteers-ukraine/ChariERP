'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ITaskResponse } from '@/types';
import { useWindowWidth } from '@/hooks';
import { Clip, Comment, Info, SubMenu } from '@/assets/icons';
import {
  Accordion,
  TitleTask,
  ButtonBack,
  EditorTask,
  Attachments,
  CommentEditor,
  TitleTaskSection,
} from '@/components';

import { getStyles } from './style';
import { CommentsProvider } from './model';
import { TaskDetails } from './task-details';
import { ToolsMenu } from './tools-drop-menu';

interface ITaskProps {
  task: ITaskResponse;
}

export const Task = ({ task }: ITaskProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const text = useTranslations('taskPage');

  const { isLaptop } = useWindowWidth();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
    if (!isOpen) {
      setTimeout(() => {
        setIsVisible(false);
      }, 10);
    }
  }, [isOpen]);

  const styles = getStyles({ isVisible });

  return (
    <div className={styles.section}>
      <ButtonBack title={task.boardTitle} />
      <section className={styles.wrapperTitle}>
        <TitleTask titleTask={task.title} taskId={task.id} />
        <ToolsMenu taskId={task.id} />
      </section>

      <section className={styles.subSection}>
        <Accordion
          icon={Info}
          initialState={isOpen}
          title={text('details.title')}
          classNameWrapper={styles.accordion}
          classNameTitle="text-[20px] uppercase"
          setVisible={() => setIsOpen((prev) => !prev)}
        >
          <TaskDetails task={task} />
        </Accordion>
        {isLaptop && (
          <>
            <TitleTaskSection icon={Info} title={text('details.title')} />

            <TaskDetails task={task} />
          </>
        )}
      </section>

      <section className={styles.subSection}>
        <TitleTaskSection icon={SubMenu} title={text('taskDescription.title')} />
        <EditorTask taskId={task.id} taskDescription={task.description} />
        <TitleTaskSection icon={Clip} title={text('attachments.title')} className={styles.subTitle} />
        <Attachments />
        <TitleTaskSection icon={Comment} title={text('comments.title')} className={styles.subTitle} />
        <CommentsProvider taskId={task.id} initialComments={task.comments}>
          <CommentEditor />
        </CommentsProvider>
      </section>
    </div>
  );
};
