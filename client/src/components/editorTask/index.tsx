'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils';
import { Editor, EditorBtnGroup } from '@/components';

export const EditorTask = ({ taskDescription }: { taskDescription: string | null }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [description, setDescription] = useState<string | null>(taskDescription);

  const placeholder = useTranslations('taskPage.taskDescription');

  const save = () => {
    console.log(description);
  };

  return (
    <>
      <Editor
        isEditing={isEditing}
        onSave={setDescription}
        onOpen={() => setIsEditing(true)}
        initialState={description || undefined}
        placeholder={placeholder('placeholder')}
        className={cn('min-h-[26px]', isEditing && 'mb-2')}
      />
      {isEditing && (
        <EditorBtnGroup
          onSave={save}
          isDisabled={!description}
          setIsEditing={() => {
            setIsEditing(false);
            setDescription(null);
          }}
        />
      )}
    </>
  );
};
