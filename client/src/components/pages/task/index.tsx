'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ITaskResponse } from '@/types';
import { Clip, Comment, SubMenu, Warning } from '@/assets/icons';
import { Attachments, ButtonBack, CommentEditor, EditorTask, TitleTaskSection } from '@/components';

import { getStyles } from './style';
import { CommentsProvider } from './model';
import { getValidationSchema } from './config';

interface ITaskProps {
  task: ITaskResponse;
}

export const Task = ({ task }: ITaskProps) => {
  const styles = getStyles();

  const text = useTranslations('taskPage');

  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

      <textarea
        value={title}
        ref={textareaRef}
        onChange={onChange}
        placeholder={title}
        className={styles.textarea}
        onBlur={() => onHandleBlur()}
      />
      {error && (
        <div className={styles.wrapperError}>
          <Warning width={14} height={14} />

          <span className={styles.errorText}>{error}</span>
        </div>
      )}

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
