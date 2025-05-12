'use client';

import { useTranslations } from 'next-intl';

import { ITaskResponse } from '@/types';
import { Clip, Comment, SubMenu } from '@/assets/icons';
import { Attachments, ButtonBack, CommentEditor, EditorTask, TitleTask, TitleTaskSection } from '@/components';

import { getStyles } from './style';
import { CommentsProvider } from './model';

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
        {/* TODO add menu */}
      </div>
      <section className={styles.subSection}>
        <TitleTaskSection icon={SubMenu} title={text('taskDescription.title')} />
        <EditorTask taskId={task.id} taskDescription={task.description} />
        <TitleTaskSection icon={Clip} title={text('attachments.title')} className={styles.subTitle} />
        <Attachments taskId={task.id} fileList={task.attachment} />
        <TitleTaskSection icon={Comment} title={text('comments.title')} className={styles.subTitle} />
        <CommentsProvider taskId={task.id} initialComments={task.comments}>
          <CommentEditor />
        </CommentsProvider>
      </section>
    </section>
  );
};
