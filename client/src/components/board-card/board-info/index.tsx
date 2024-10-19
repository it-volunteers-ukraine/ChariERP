'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { onCopy } from '@/utils';
import { routes } from '@/constants';
import { useOutsideClick } from '@/hooks';
import { CopyBoard, Delete, PencilJust } from '@/assets/icons';

import { getStyles } from './style';
import { IBoardCardProps } from '../types';

export const BoardInfo = ({ isRoleAccess, board, onReset, onSubmit, onDelete }: IBoardCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages = useTranslations('board');
  const messagesCopy = useTranslations('copy');

  const isCreateCard = board.id === 'new';

  const [title, setTitle] = useState(board.title || '');
  const [isEditing, setIsEditing] = useState(isCreateCard);

  const emptyText = title === '';

  const styles = getStyles(isEditing);

  const onHandleBlur = (state?: boolean) => {
    const newIsEdit = state ?? false;

    setIsEditing(newIsEdit);

    if (!isEditing && emptyText) {
      setTitle(board?.title || '');
    }

    if (isCreateCard && emptyText && onReset) {
      onReset(board.id);

      return;
    }

    if (title !== board?.title && !emptyText) {
      onSubmit(title, board.id);
    }

    if (emptyText) {
      setTitle(board?.title || '');
    }
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

  useOutsideClick(linkRef, onHandleBlur);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      handleFocus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    onHandleBlur(!isEditing);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLButtonElement | HTMLTextAreaElement>, func?: () => void) => {
    e.preventDefault();
    e.stopPropagation();

    if (func) {
      func();
    }
  };

  console.log({ board });

  return (
    <Link ref={linkRef} className={styles.wrapper} href={!isCreateCard ? `${routes.managerDashboard}/${board.id}` : ''}>
      <div className="mb-8 flex w-full items-center justify-between">
        <p className="text-[18px] font-medium leading-5 text-comet">#{board.order}</p>

        <div className="flex">
          {isRoleAccess && (
            <button className={styles.editButton} onClick={(e) => stopPropagation(e, handleEditClick)}>
              <PencilJust className={styles.icon} />
            </button>
          )}

          <button
            disabled={isEditing}
            className={styles.button}
            onClick={(e) => onCopy(e, `${window.location.href}/${board.id}`, messagesCopy('messages'))}
          >
            <CopyBoard className={styles.icon} />
          </button>

          {isRoleAccess && (
            <button
              disabled={isEditing}
              className={styles.button}
              onClick={(e) => stopPropagation(e, () => onDelete(board.id))}
            >
              <Delete className={styles.icon} />
            </button>
          )}
        </div>
      </div>

      <textarea
        value={title}
        ref={textareaRef}
        onChange={onChange}
        disabled={!isEditing}
        onClick={stopPropagation}
        className={styles.textarea}
        onBlur={() => onHandleBlur()}
        placeholder={messages('newBoard')}
      />
    </Link>
  );
};
