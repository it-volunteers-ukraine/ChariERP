'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Warning } from '@/assets/icons';

import { getStyles } from './style';
import { ButtonIcon } from '../../button-icon';
import { getValidationSchema } from './config';

export const Task = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');

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
      <div className={styles.wrapperBack}>
        <ButtonIcon type="button" icon="back" iconType="primary" onClick={() => router.back()} />
      </div>

      <textarea
        value={title}
        ref={textareaRef}
        onChange={onChange}
        // disabled={!isCreate}
        className={styles.textarea}
        placeholder={'Назва таски'}
        onBlur={() => onHandleBlur()}
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
