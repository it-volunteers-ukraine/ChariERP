'use client';

import { useState } from 'react';
import { Editor } from '../editor';
import { Button } from '../button';

interface IComment {
  id: number;
  comment: string;
}

export const ViewEditor = () => {
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
      {comments.map((comment) => (
        <div key={comment.id} className="mb-5">
          <p>{`${isEditing}`}</p>
          <p>{`${comment.id}`}</p>
          <p>{`${isEditing === comment.id}`}</p>

          <Editor
            isEditing={isEditing === comment.id}
            initialState={comment.comment}
            onSave={setActiveComment}
            className="mb-2"
          />
          {!isEditing && (
            <button className="text-[15px] text-darkBlueFocus" type="button" onClick={() => setIsEditing(comment.id)}>
              Редагувати
            </button>
          )}
          {isEditing && (
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
        </div>
      ))}
      <Editor onSave={setActiveComment} isEditing={isEditing === null} onOpen={() => setIsEditing(null)} />
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
    </div>
  );
};
