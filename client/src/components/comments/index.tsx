'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils';
import { useUserInfo } from '@/context';
import { ICommentResponse } from '@/types';
import { UserIcon, Editor } from '@/components';

import { Comment } from './comment';
import { EditorBtnGroup } from './btn-group';
import { useAddComment } from '../pages/task/api';

interface ICommentEditor {
  taskId: string;
  taskComments: ICommentResponse[];
}

export const CommentEditor = ({ taskId, taskComments }: ICommentEditor) => {
  const placeholder = useTranslations('editor');

  const [comments, setComments] = useState<ICommentResponse[]>(taskComments);
  const [activeComment, setActiveComment] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null | false>(false);

  const { onAddComment } = useAddComment(taskId);

  const { firstName, lastName, avatarUrl } = useUserInfo();

  const onSave = () => {
    setIsEditing(false);

    if (activeComment) {
      onAddComment({ text: activeComment, setComments });
      setActiveComment(null);
    }
  };

  const onDelete = (id: string) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="p-1">
      <div className="flex items-center gap-3 [&>:first-child]:min-w-6">
        <UserIcon avatarUrl={avatarUrl as string} firstName={firstName as string} lastName={lastName as string} />
        <div className="flex w-full flex-col gap-y-3">
          <Editor
            onSave={setActiveComment}
            isEditing={isEditing === null}
            onOpen={() => setIsEditing(null)}
            placeholder={placeholder('placeholder')}
            classNamePlaceholder="top-[13px] left-[20px]"
            className={cn(
              'rounded-lg border border-[#65657526] px-4 py-3 shadow-md outline-none focus:border-darkBlueFocus',
              isEditing === null ? 'min-h-[100px]' : 'min-h-[48px]',
            )}
          />

          <div className="flex gap-4">
            {isEditing === null && (
              <EditorBtnGroup isDisabled={!activeComment} onSave={onSave} setIsEditing={setIsEditing} />
            )}
          </div>
        </div>
      </div>
      {comments.map((comment, idx) => {
        return (
          <Comment
            onSave={onSave}
            comment={comment}
            onDelete={onDelete}
            isEditing={isEditing}
            isDisabled={!activeComment}
            setIsEditing={setIsEditing}
            key={`${comment.createdAt}_${idx}`}
            setActiveComment={setActiveComment}
          />
        );
      })}
    </div>
  );
};
