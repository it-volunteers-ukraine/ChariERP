'use client';

import { useTranslations } from 'next-intl';

import { Clip, Comment, Info, SubMenu } from '@/assets/icons';

import { ITaskResponse } from '@/types';
import { Attachments, ButtonBack, CommentEditor, EditorTask, TitleTask, TitleTaskSection } from '@/components';

import { getStyles } from './style';
import { CommentsProvider } from './model';
import { TaskDetails } from './task-details';
import { ToolsMenu } from './tools-drop-menu';

interface ITaskProps {
  task: ITaskResponse;
}

export const Task = ({ task }: ITaskProps) => {
  const styles = getStyles();

  const text = useTranslations('taskPage');

  return (
    <section className={styles.section}>
      <ButtonBack title={task.boardTitle} />
      <div className={styles.wrapperTitle}>
        <TitleTask titleTask={task.title} taskId={task.id} />
        <ToolsMenu taskId={task.id} />
      </div>
      <section className={styles.subSection}>
        <TitleTaskSection icon={Info} title={text('details.title')} className="tablet:mb-6" />
        <TaskDetails task={task} />
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
    </section>
  );
};
