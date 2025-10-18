'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import logger from '@/utils/logger/logger';

import { useUserInfo } from '@/context';
import { cn, fetchAvatarUrl } from '@/utils';
import { Editor, UserIcon } from '@/components';

import { Comment } from './comment';
import { EditorBtnGroup } from './btn-group';
import { useComments } from '../pages/task/model';

export const CommentEditor = () => {
  const placeholder = useTranslations('editor');

  const { firstName, lastName, avatarUrl, _id } = useUserInfo();

  const [img, setImg] = useState<string>('');
  const [newComment, setNewComment] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const { comments, addComment, isPending } = useComments();

  useEffect(() => {
    loadAvatar();
  }, [_id, avatarUrl]);

  const loadAvatar = async () => {
    try {
      if (_id && avatarUrl) {
        const avatar = await fetchAvatarUrl(_id.toString(), avatarUrl);

        setImg(avatar);
      }
    } catch (error) {
      logger.error('Error loading avatar', error);
    }
  };

  const handleAddComment = () => {
    if (newComment) {
      addComment(newComment);
    }
    setIsCreating(false);
    setNewComment('');
  };

  return (
    <div className="p-1">
      <div className="flex items-center gap-3 [&>:first-child]:min-w-6">
        <UserIcon avatarUrl={img} firstName={firstName as string} lastName={lastName as string} />
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
                onSave={handleAddComment}
                onCancel={() => setIsCreating(false)}
                isDisabled={!newComment || isPending}
              />
            )}
          </div>
        </div>
      </div>
      {comments.map((comment, idx) => (
        <Comment comment={comment} key={`${comment.createdAt}_${idx}`} />
      ))}
    </div>
  );
};
