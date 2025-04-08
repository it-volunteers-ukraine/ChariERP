'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils';
import { useUserInfo } from '@/context';
import { ICommentResponse } from '@/types';
import { UserIcon, Editor } from '@/components';

import { Comment } from './comment';
import { EditorBtnGroup } from './btn-group';
import { useAddComment, useDeleteComment } from '../pages/task/api';
import { useUpdateComment } from '../pages/task/api/use-update-comment';

interface ICommentEditor {
  taskId: string;
  taskComments: ICommentResponse[];
}

export const CommentEditor = ({ taskId, taskComments }: ICommentEditor) => {
  const placeholder = useTranslations('editor');

  const [isCreating, setIsCreating] = useState(false);
  const [newComment, setNewComment] = useState<string | null>(null);
  const [comments, setComments] = useState<ICommentResponse[]>(taskComments);

  const { onAddComment } = useAddComment({ taskId, setComments });
  const { onDeleteComment } = useDeleteComment({ taskId, setComments });
  const { onUpdateComment } = useUpdateComment({ taskId, setComments });

  const { firstName, lastName, avatarUrl } = useUserInfo();

  const handleAddComment = () => {
    if (newComment) {
      onAddComment(newComment);
    }
    setIsCreating(false);
    setNewComment(null);
  };

  return (
    <div className="p-1">
      <div className="flex items-center gap-3 [&>:first-child]:min-w-6">
        <UserIcon avatarUrl={avatarUrl as string} firstName={firstName as string} lastName={lastName as string} />
        <div className="flex w-full flex-col gap-y-3">
          <Editor
            onSave={setNewComment}
            isEditing={isCreating}
            onOpen={() => setIsCreating(true)}
            placeholder={placeholder('placeholder')}
            classNamePlaceholder="top-[13px] left-[20px]"
            className={cn(
              'rounded-lg border border-[#65657526] px-4 py-3 shadow-md outline-none focus:border-darkBlueFocus',
              isCreating ? 'min-h-[100px]' : 'min-h-[48px]',
            )}
          />

          <div className="flex gap-4">
            {isCreating && (
              <EditorBtnGroup
                isDisabled={!newComment}
                onSave={handleAddComment}
                onCancel={() => setIsCreating(false)}
              />
            )}
          </div>
        </div>
      </div>
      {comments.map((comment, idx) => (
        <Comment
          comment={comment}
          onDelete={onDeleteComment}
          onUpdateComment={onUpdateComment}
          key={`${comment.createdAt}_${idx}`}
        />
      ))}
    </div>
  );
};
