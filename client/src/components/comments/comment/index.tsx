import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { ICommentResponse } from '@/types';
import { Editor, UserIcon } from '@/components';
import { useComments } from '@/components/pages/task/model';

import { EditorBtnGroup } from '../btn-group';

interface CommentListProps {
  comment: ICommentResponse;
}

export const Comment = ({ comment }: CommentListProps) => {
  const { _id } = useUserInfo();
  const userId = _id ? String(_id) : undefined;

  const btnEditor = useTranslations('editor.button');

  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState<string | null>(comment.comment);

  const { deleteComment, updateComment, isPending } = useComments();

  const handleUpdateComment = () => {
    if (commentText) {
      updateComment({ text: commentText, commentId: comment.id });
    }
    setIsEditing(false);
  };

  return (
    <div className="mt-6 flex gap-4 [&>:first-child]:min-w-6">
      <UserIcon
        lastName={comment.author.lastName}
        avatarUrl={comment.author.avatarUrl}
        firstName={comment.author.firstName}
      />
      <div className="flex w-full flex-col gap-y-2">
        <div className="flex gap-4">
          <p className="text-sm text-lightBlue">
            {comment.author.firstName} {comment.author.lastName}
          </p>

          <p className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleString('uk-UA', {
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              month: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <Editor
          isEditing={isEditing}
          onSave={setCommentText}
          initialState={comment.comment}
          className="mb-2 rounded-lg border border-[#65657526] px-4 py-3 shadow-md focus:border-darkBlueFocus"
        />
        {isEditing ? (
          <EditorBtnGroup
            onSave={handleUpdateComment}
            onCancel={() => setIsEditing(false)}
            isDisabled={!commentText || isPending}
          />
        ) : (
          comment.author.id === userId && (
            <div className="flex gap-4">
              <button className="text-[15px] text-lightBlue" type="button" onClick={() => setIsEditing(true)}>
                {btnEditor('btnEdit')}
              </button>

              <button
                type="button"
                disabled={isPending}
                className="text-[15px] text-lightBlue"
                onClick={() => deleteComment(comment.id)}
              >
                {btnEditor('btnDelete')}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
