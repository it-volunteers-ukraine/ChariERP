import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { Editor, UserIcon } from '@/components';

import { IComment } from '../types';
import { EditorBtnGroup } from '../btn-group';

interface CommentListProps extends IComment {
  onSave: () => void;
  onDelete: (id: string) => void;
  isEditing: string | null | boolean;
  onDisabled: () => boolean | undefined;
  setActiveComment: (comment: string | null) => void;
  setIsEditing: (id: string | null | false) => void;
}

export const Comment = ({
  id,
  date,
  time,
  avatar,
  onSave,
  comment,
  authorId,
  onDelete,
  lastName,
  firstName,
  isEditing,
  onDisabled,
  setIsEditing,
  setActiveComment,
}: CommentListProps) => {
  const btnEditor = useTranslations('editor');

  const { _id } = useUserInfo();

  const userId = _id ? String(_id) : undefined;

  return (
    <div className="mt-6 flex gap-4 [&>:first-child]:min-w-6">
      <UserIcon avatarUrl={avatar} firstName={firstName} lastName={lastName} />
      <div className="flex w-fit flex-col gap-y-2">
        <div className="flex gap-4">
          <p className="text-sm">
            {firstName} {lastName}
          </p>

          <p className="text-sm text-gray-500">
            {date}, {time}
          </p>
        </div>

        <Editor
          initialState={comment}
          onSave={setActiveComment}
          isEditing={isEditing === id}
          className="mb-2 rounded-lg border border-[#65657526] px-4 py-3 shadow-md focus:border-darkBlueFocus"
        />
        {isEditing === id ? (
          <EditorBtnGroup onDisabled={onDisabled} onSave={onSave} setIsEditing={setIsEditing} />
        ) : (
          authorId === userId && (
            <div className="flex gap-4">
              <button className="text-[15px] text-lightBlue" type="button" onClick={() => setIsEditing(id)}>
                {btnEditor('btnEdit')}
              </button>

              <button className="text-[15px] text-lightBlue" type="button" onClick={() => onDelete(id)}>
                {btnEditor('btnDelete')}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
