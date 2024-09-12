'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { onCopy } from '@/utils';

import { getStyles } from './style';
import { IBoardInfoProps } from './types';
import { CopyBoard, Delete, PencilJust } from '@/assets/icons';

export const BoardInfo = ({ isRoleAccess, setIsGoRoute, boardData, setIsEdit, number }: IBoardInfoProps) => {
  const isBoardData = !!boardData;

  const [title, setTitle] = useState(boardData?.title || '');
  const [isEdited, setIsEdited] = useState(!isBoardData);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const styles = getStyles(isEdited);

  const messages = useTranslations('board');
  const messagesCopy = useTranslations('copy');

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

  const handleBlur = () => {
    if (title === '') {
      setIsEdit?.(false);
      setIsEdited(false);

      return;
    }

    if (!isBoardData) {
      //TODO create board
      console.log('Create new board title:', title);
      setIsEdited(false);

      return;
    }

    if (boardData?.title !== title) {
      //TODO edit board
      console.log('Edit board id:', boardData?.id, ' New title:', title);
    }
    setIsEdited(false);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLButtonElement>, func: () => void) => {
    e.stopPropagation();
    func();
  };

  const handleDeleteClick = () => {
    //TODO delete board boardData.id
    console.log('Delete board id:', boardData?.id);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full mb-8">
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
            className={styles.button}
            disabled={isEdited}
            onClick={(e) => onCopy(e, `${window.location.href}/${boardData?.id}`, messagesCopy('messages'))}
          >
            <CopyBoard className={styles.icon} />
          </button>

          {isRoleAccess && (
            <button
              className={styles.button}
              disabled={isEdited}
              onClick={(e) => stopPropagation(e, handleDeleteClick)}
            >
              <Delete className={styles.icon} />
            </button>
          )}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={title}
        onChange={handleTitleChange}
        onBlur={handleBlur}
        placeholder={messages('newBoard')}
        disabled={!isEdited}
      />
    </>
  );
};
