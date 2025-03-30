import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { Editor, UserIcon } from '@/components';

import { IComment } from '../types';
import { EditorBtnGroup } from '../btn-group';

interface CommentListProps extends IComment {
  onSave: () => void;
  isDisabled: boolean;
  onDelete: (id: string) => void;
  isEditing: string | null | boolean;
  setIsEditing: (id: string | null | false) => void;
  setActiveComment: (comment: string | null) => void;
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
  isDisabled,
  setIsEditing,
  setActiveComment,
}: CommentListProps) => {
  const btnEditor = useTranslations('editor.button');

  const { _id } = useUserInfo();

  const userId = _id ? String(_id) : undefined;

  return (
    <div className="mt-6 flex gap-4 [&>:first-child]:min-w-6">
      <UserIcon avatarUrl={avatar} firstName={firstName} lastName={lastName} />
      <div className="flex w-full flex-col gap-y-2">
        <div className="flex gap-4">
          <p className="text-sm text-lightBlue">
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
          <EditorBtnGroup isDisabled={isDisabled} onSave={onSave} setIsEditing={setIsEditing} />
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
