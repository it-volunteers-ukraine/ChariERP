'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { ITaskResponse } from '@/types';
import { Clip, Comment, Info, SubMenu } from '@/assets/icons';
import { Attachments, ButtonBack, CommentEditor, EditorTask, TitleTaskSection } from '@/components';

import { getStyles } from './style';
import { TitleTask } from './title-task';
import { CommentsProvider } from './model';
import { TaskDetails } from './task-details';
import { getValidationSchema } from './config';

interface ITaskProps {
  task: ITaskResponse;
}

export const Task = ({ task }: ITaskProps) => {
  const styles = getStyles();

  const text = useTranslations('taskPage');

  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onHandleBlur = async () => {
    try {
      await getValidationSchema().validate({ title });
      setError(null);
    } catch (validationError) {
      setError((validationError as Error).message);
    }
  };

  return (
    <section className={styles.section}>
      <ButtonBack title={task.boardTitle} />
      <TitleTask error={error} onChange={onChange} onHandleBlur={onHandleBlur} title={title} />
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
