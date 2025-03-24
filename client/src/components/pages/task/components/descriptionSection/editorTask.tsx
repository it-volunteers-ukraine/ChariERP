import { useState } from 'react';

import { Editor } from '@/components/editor';
import { EditorBtnGroup } from '@/components/comments/btn-group';
import { cn } from '@/utils';

export const EditorTask = ({ taskDescription = null }: { taskDescription?: string | null }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [description, setDescription] = useState<string | null>(taskDescription);

  const save = () => {
    console.log(description);
  };

  return (
    <>
      <Editor
        isEditing={isEditing}
        onSave={setDescription}
        className={cn('min-h-[26px]', isEditing && 'mb-2')}
        onOpen={() => setIsEditing(true)}
        placeholder="Додайте опис завдання"
        initialState={description || undefined}
      />
      {isEditing && <EditorBtnGroup isDisabled={!description} onSave={save} setIsEditing={() => setIsEditing(false)} />}
    </>
  );
};
