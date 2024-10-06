'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { onCopy } from '@/utils';
import { CopyBoard, Delete, PencilJust } from '@/assets/icons';

import { getStyles } from './style';
import { IBoardInfoProps } from './types';

export const BoardInfo = ({ isRoleAccess, setIsGoRoute, boardData, setIsEdit, number }: IBoardInfoProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messages = useTranslations('board');
  const messagesCopy = useTranslations('copy');

  const isBoardData = !!boardData;

  const [isEdited, setIsEdited] = useState(!isBoardData);
  const [title, setTitle] = useState(boardData?.title || '');

  const styles = getStyles(isEdited);

  useEffect(() => {
    if (isEdited && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEdited]);

  const handleEditClick = () => {
    setIsEdited(true);
    if (setIsGoRoute) {
      setIsGoRoute(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.scrollTop = 0;

    if (title === '') {
      setIsEdit?.(false);
      setIsEdited(false);

      return;
    }

    if (!isBoardData) {
      //TODO create board
      setIsEdited(false);

      return;
    }

    if (boardData?.title !== title) {
      //TODO edit board
    }
    setIsEdited(false);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLButtonElement>, func: () => void) => {
    e.stopPropagation();
    func();
  };

  const handleDeleteClick = () => {
    //TODO delete board boardData.id
  };

  return (
    <>
      <div className="mb-8 flex w-full items-center justify-between">
        <p className="text-[18px] font-medium leading-5 !text-comet">
          #{boardData?.number !== undefined ? boardData.number + 1 : number}
        </p>

        <div className="flex">
          {isRoleAccess && (
            <button
              className={styles.editButton}
              disabled={isEdited && !boardData?.id}
              onClick={(e) => stopPropagation(e, handleEditClick)}
            >
              <PencilJust className={styles.icon} />
            </button>
          )}

          <button
            disabled={isEdited}
            className={styles.button}
            onClick={(e) => onCopy(e, `${window.location.href}/${boardData?.id}`, messagesCopy('messages'))}
          >
            <CopyBoard className={styles.icon} />
          </button>

          {isRoleAccess && (
            <button
              disabled={isEdited}
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
        onBlur={handleBlur}
        disabled={!isEdited}
        className={styles.textarea}
        onChange={handleTitleChange}
        placeholder={messages('newBoard')}
        onClick={(e) => e.stopPropagation()}
      />
    </>
  );
};
