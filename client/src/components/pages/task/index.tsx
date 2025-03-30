'use client';

import { useRef, useState } from 'react';

import { ITaskResponse } from '@/types';
import { Warning } from '@/assets/icons';

import { getStyles } from './style';
import { getValidationSchema } from './config';
import { DescriptionSection } from './components';
import { ButtonBack } from './components/buttonBack';

interface ITaskProps {
  task: ITaskResponse;
}

export const Task = ({ task }: ITaskProps) => {
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(task.title);

  const styles = getStyles(false);

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
      <ButtonBack title={task.boardColumn_id.toString()} />

      <textarea
        value={title}
        ref={textareaRef}
        onChange={onChange}
        className={styles.textarea}
        placeholder={title}
        onBlur={() => onHandleBlur()}
      />
      {error && (
        <div className={styles.wrapperError}>
          <Warning width={14} height={14} />

          <span className={styles.errorText}>{error}</span>
        </div>
      )}

      <DescriptionSection />
    </section>
  );
};
