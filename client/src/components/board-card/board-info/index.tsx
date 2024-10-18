// @ts-nocheck
/* eslint-disable */
'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { onCopy } from '@/utils';
import { useOutsideClick } from '@/hooks';
import { CopyBoard, Delete, PencilJust } from '@/assets/icons';

import { getStyles } from './style';
import { IBoardInfoProps } from './types';

export const BoardInfo = ({ isRoleAccess, setIsGoRoute, board, setIsEdit, number, isEdit }: IBoardInfoProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messages = useTranslations('board');
  const messagesCopy = useTranslations('copy');

  const isBoardData = !!board;

  const [isEditing, setIsEditing] = useState(!isBoardData);
  const [title, setTitle] = useState(board?.title || '');

  const styles = getStyles(isEditing);

  useOutsideClick(wrapperRef, () => {
    if (isEditing) {
      setIsEditing(false);
      put();
    }
  });

  const put = () => {
    console.log({ text: title });
  };

  const handleFocus = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      if (textarea.value.length > 0) {
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }

      textarea.focus();
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      handleFocus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing((prev) => {
      const newEdit = !prev;

      if (!newEdit) {
        if (title === '') {
          setTitle(board?.title || '');

          return newEdit;
        }
        put();
      }

      return newEdit;
    });

    // if (setIsGoRoute) {
    //   setIsGoRoute(false);
    // }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  // const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
  //   e.target.scrollTop = 0;
  //   console.log({ e: e.target });

  //   if (title === '') {
  //     setIsEdit?.(false);
  //     setIsEditing(false);

  //     return;
  //   }

  //   if (!isBoardData) {
  //     //TODO create board
  //     setIsEditing(false);

  //     return;
  //   }

  //   if (board?.title !== title) {
  //     //TODO edit board
  //   }
  //   setIsEditing(false);
  // };

  const stopPropagation = (e: React.MouseEvent<HTMLButtonElement>, func: () => void) => {
    e.stopPropagation();
    func();
  };

  const handleDeleteClick = () => {
    //TODO delete board boardData.id
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className="mb-8 flex w-full items-center justify-between">
        <p className="text-[18px] font-medium leading-5 !text-comet">
          #{board?.order !== undefined ? board.order : number}
        </p>

        <div className="flex">
          {isRoleAccess && (
            <button
              className={styles.editButton}
              // disabled={isEditing && !board?.id}
              onClick={(e) => stopPropagation(e, handleEditClick)}
            >
              <PencilJust className={styles.icon} />
            </button>
          )}

          <button
            disabled={isEditing}
            className={styles.button}
            onClick={(e) => onCopy(e, `${window.location.href}/${board?.id}`, messagesCopy('messages'))}
          >
            <CopyBoard className={styles.icon} />
          </button>

          {isRoleAccess && (
            <button
              disabled={isEditing}
              className={styles.button}
              onClick={(e) => stopPropagation(e, handleDeleteClick)}
            >
              <Delete className={styles.icon} />
            </button>
          )}
        </div>
      </div>

      <textarea
        value={title}
        ref={textareaRef}
        // onBlur={handleBlur}
        disabled={!isEditing}
        className={styles.textarea}
        onChange={handleTitleChange}
        placeholder={messages('newBoard')}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
