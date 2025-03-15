'use client';

import { useState } from 'react';
import { cn } from '@/utils';

import { Editor } from '../editor';
import { Button } from '../button';

interface IComment {
  id: number;
  comment: string;
}

export const CommentEditor = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [activeComment, setActiveComment] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<number | null | false>(false);

  const onSave = () => {
    setIsEditing(false);
    if (activeComment) {
      if (typeof isEditing === 'number') {
        setComments((prevComments) =>
          prevComments.map((comment) => (comment.id === isEditing ? { ...comment, comment: activeComment } : comment)),
        );
      }

      setComments((prevComments) => [...prevComments, { id: prevComments.length + 1, comment: activeComment }]);
    }
    setActiveComment(null);
  };

  return (
    <div className="px-[400px]">
      <Editor
        className={cn(
          'rounded border border-[#F0F0F0] px-4 py-3 outline-none focus:border-darkBlueFocus',
          isEditing === null ? 'min-h-[100px]' : 'min-h-[48px]',
        )}
        onSave={setActiveComment}
        placeholder="Додайте опис завдання"
        isEditing={isEditing === null}
        onOpen={() => setIsEditing(null)}
      />
      {isEditing === null && (
        <div className="flex gap-2 transition-all duration-300 ease-in-out">
          <Button
            onClick={onSave}
            className="h-[44px] w-[122px]"
            text="Зберегти"
            type="button"
            styleType="icon-primary"
          />
          <Button
            className="h-[44px] w-[122px]"
            text="Скасувати"
            type="button"
            styleType="outline-blue"
            onClick={() => {
              setIsEditing(false);
            }}
          />
        </div>
      )}
      {comments.map((comment) => (
        <div key={comment.id}>
          <Editor
            isEditing={isEditing === comment.id}
            initialState={comment.comment}
            onSave={setActiveComment}
            className="mb-2"
          />
          {isEditing === comment.id}
        </div>
      ))}
    </div>
  );
};

// <div key={comment.id} className="mb-5">
//   <Editor
//     isEditing={isEditing === comment.id}
//     initialState={comment.comment}
//     onSave={setActiveComment}
//     className="mb-2"
//   />
//   {isEditing === comment.id ? (
//     <div className="flex gap-2 transition-all duration-300 ease-in-out">
//       <Button
//         onClick={onSave}
//         className="h-[44px] w-[122px]"
//         text="Зберегти"
//         type="button"
//         styleType="icon-primary"
//       />
//       <Button
//         className="h-[44px] w-[122px]"
//         text="Скасувати"
//         type="button"
//         styleType="outline-blue"
//         onClick={() => {
//           setIsEditing(false);
//         }}
//       />
//     </div>
//   ) : (
//     <button className="text-[15px] text-darkBlueFocus" type="button" onClick={() => setIsEditing(comment.id)}>
//       Редагувати
//     </button>
//   )}
// </div>
