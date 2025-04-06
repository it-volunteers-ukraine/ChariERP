import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { ICommentResponse } from '@/types';
import { Editor, UserIcon } from '@/components';

import { EditorBtnGroup } from '../btn-group';

interface CommentListProps {
  onSave: () => void;
  isDisabled: boolean;
  comment: ICommentResponse;
  onDelete: (id: string) => void;
  isEditing: string | null | boolean;
  setIsEditing: (id: string | null | false) => void;
  setActiveComment: (comment: string | null) => void;
}

export const Comment = ({
  onSave,
  comment,
  onDelete,
  isEditing,
  isDisabled,
  setIsEditing,
  setActiveComment,
}: CommentListProps) => {
  const btnEditor = useTranslations('editor.button');

  const { _id } = useUserInfo();

  const userId = _id ? String(_id) : undefined;

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
          onSave={setActiveComment}
          initialState={comment.comment}
          isEditing={isEditing === comment.id}
          className="mb-2 rounded-lg border border-[#65657526] px-4 py-3 shadow-md focus:border-darkBlueFocus"
        />
        {isEditing === comment.id ? (
          <EditorBtnGroup isDisabled={isDisabled} onSave={onSave} setIsEditing={setIsEditing} />
        ) : (
          comment.author.id === userId && (
            <div className="flex gap-4">
              <button className="text-[15px] text-lightBlue" type="button" onClick={() => setIsEditing(comment.id)}>
                {btnEditor('btnEdit')}
              </button>

              <button className="text-[15px] text-lightBlue" type="button" onClick={() => onDelete(comment.id)}>
                {btnEditor('btnDelete')}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
