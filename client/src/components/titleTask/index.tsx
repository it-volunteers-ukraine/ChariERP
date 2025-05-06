'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { Warning } from '@/assets/icons';

import { getStyles } from './styles';
import { useUpdateTitle } from '../pages/task/api';
import { titleTaskValidation } from '../formik-config';

interface ITitleTaskProps {
  taskId: string;
  titleTask: string;
}

export const TitleTask = ({ titleTask, taskId }: ITitleTaskProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [prevTitle, setPrevTitle] = useState(titleTask);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isManager } = useUserInfo();
  const { isPending, updateTitle } = useUpdateTitle(taskId);

  const styles = getStyles(isEdit);

  const errorMessages = useTranslations('validation');

  const formik = useFormik({
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: titleTaskValidation(errorMessages),
    initialValues: {
      title: titleTask,
    },
    onSubmit: async (values) => {
      try {
        await updateTitle(values.title);
        setPrevTitle(values.title);
      } catch {
        formik.setFieldValue('title', prevTitle);
      }
    },
  });

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formik.values.title]);

  const handleBlur = async (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.scrollTop = 0;
    setIsEdit(false);

    await formik.handleBlur(e);

    if (!formik.errors.title && formik.values.title !== prevTitle) {
      formik.handleSubmit();
    }
  };

  const handleFocus = () => {
    if (isManager) {
      setIsEdit(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        rows={1}
        name="title"
        ref={textareaRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="New task"
        className={styles.title}
        value={formik.values.title}
        onChange={formik.handleChange}
        disabled={!isManager || isPending}
      />
      {formik.errors.title && (
        <div className={styles.wrapperError}>
          <Warning width={14} height={14} />

          <span className={styles.errorText}>{formik.errors.title}</span>
        </div>
      )}
    </div>
  );
};
