'use client';

import { useState } from 'react';

import { cn } from '@/utils';
import { useUserInfo } from '@/context';
import { UserIcon, Editor } from '@/components';

import { IComment } from './types';
import { Comment } from './comment';
import { EditorBtnGroup } from './btn-group';

export interface ICommentEditor {
  placeholder: string;
}

export const CommentEditor = ({ placeholder }: ICommentEditor) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [activeComment, setActiveComment] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null | false>(false);

  const { _id, firstName, lastName, avatarUrl } = useUserInfo();

  const authorId = _id ? String(_id) : undefined;

  const onDisabled = () => {
    const js = activeComment && JSON.parse(activeComment);

    if (js.root.children[0]?.children.length > 0) {
      return false;
    }

    return true;
  };

  const onSave = () => {
    setIsEditing(false);
    if (!authorId) {
      return;
    }
    if (activeComment) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();

      if (typeof isEditing === 'string') {
        setComments((prevComments) =>
          prevComments.map((comment) => (comment.id === isEditing ? { ...comment, comment: activeComment } : comment)),
        );
      } else {
        setComments((prevComments) => [
          {
            authorId,
            date: formattedDate,
            time: formattedTime,
            comment: activeComment,
            avatar: avatarUrl as string,
            lastName: lastName as string,
            id: authorId + formattedTime,
            firstName: firstName as string,
          },
          ...prevComments,
        ]);
      }
      setActiveComment(null);
    }
  };

  const onDelete = (id: string) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="m-auto max-w-[1024px] p-1">
      <div className="flex items-center gap-3 [&>:first-child]:min-w-6">
        <UserIcon avatarUrl={avatarUrl as string} firstName={firstName as string} lastName={lastName as string} />
        <div className="flex flex-col gap-y-3">
          <Editor
            className={cn(
              'rounded-lg border border-[#65657526] px-4 py-3 shadow-md outline-none focus:border-darkBlueFocus',
              isEditing === null ? 'min-h-[100px]' : 'min-h-[48px]',
            )}
            onSave={setActiveComment}
            placeholder={placeholder}
            isEditing={isEditing === null}
            onOpen={() => setIsEditing(null)}
          />

          <div className="flex gap-4">
            {isEditing === null && (
              <EditorBtnGroup onDisabled={onDisabled} onSave={onSave} setIsEditing={setIsEditing} />
            )}
          </div>
        </div>
      </div>
      {comments.map((comment, idx) => {
        return (
          <Comment
            {...comment}
            onSave={onSave}
            onDelete={onDelete}
            isEditing={isEditing}
            onDisabled={onDisabled}
            setIsEditing={setIsEditing}
            key={`${comment.time}_${idx}`}
            setActiveComment={setActiveComment}
          />
        );
      })}
    </div>
  );
};
