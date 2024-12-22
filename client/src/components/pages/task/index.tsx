'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Warning } from '@/assets/icons';

import { getStyles } from './style';
import { ButtonIcon } from '../../button-icon';
import { getValidationSchema } from './config';

interface TaskProps {
  params: { task_id: string; column_id: string; board_id: string };
}

export const Task = ({ params }: TaskProps) => {
  const isCreate = params.task_id === 'create-task';
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(
    isCreate
      ? ''
      : 'Назва для таски Назва для таски Назва для таски Назва для таски Назва для таски Назва для таски  Назва для таски Назва для таски нНазва для таски Назва для таски Назва для таски Назва для таски Назва для таски Назва для таски  Назва для таски Назва для таски н',
  );

  const styles = getStyles(isCreate);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isCreate && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isCreate]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onHandleBlur = async () => {
    try {
      await getValidationSchema().validate({ title });
      setError(null);
      // TODO create task addTask(title)
      console.log({ title: title, columnId: params.column_id });
    } catch (validationError) {
      setError((validationError as Error).message);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapperBack}>
        <ButtonIcon type="button" icon="back" iconType="primary" onClick={() => router.back()} />
      </div>

      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={title}
        disabled={!isCreate}
        onChange={onChange}
        onBlur={() => onHandleBlur()}
        placeholder={'Назва таски'}
      />
      {error && (
        <div className={styles.wrapperError}>
          <Warning width={14} height={14} />

          <span className={styles.errorText}>{error}</span>
        </div>
      )}
    </section>
  );
};
