'use client';

import { useState } from 'react';
import { Editor } from '../editor';

interface IComment {
  id: number;
  comment: string;
}

export const ViewEditor = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [idEditing, setIdEditing] = useState<number | null>(null);

  const onSave = (id: number | null, state: string) => {
    if (id) {
      setComments((prevComments) =>
        prevComments.map((comment) => (comment.id === id ? { ...comment, comment: state } : comment)),
      );
    } else {
      setComments((prevComments) => [...prevComments, { id: prevComments.length + 1, comment: state }]);
    }

    setIdEditing(null);
  };

  return (
    <div className="px-[200px]">
      Editor
      {comments.map((comment) => (
        <div key={comment.id} className="mb-5">
          <Editor
            isEditing={idEditing === comment.id}
            cancelEditing={() => setIdEditing(null)}
            initialState={comment.comment}
            onSave={(state) => onSave(comment.id, state)}
            className="mb-2"
          />
          <button className="text-[15px] text-darkBlueFocus" type="button" onClick={() => setIdEditing(comment.id)}>
            Редагувати
          </button>
        </div>
      ))}
      <Editor onSave={(state) => onSave(null, state)} />
    </div>
  );
};
