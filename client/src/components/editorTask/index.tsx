'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils';
import { useUserInfo } from '@/context';
import { Editor, EditorBtnGroup } from '@/components';

import { useUpdateDescription } from '../pages/task/api';

interface EditorTaskProps {
  taskId: string;
  taskDescription: string;
}

export const EditorTask = ({ taskId, taskDescription }: EditorTaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(taskDescription);
  const [initialDescription, setInitialDescription] = useState(taskDescription);

  const { isManager } = useUserInfo();

  const placeholder = useTranslations('taskPage.taskDescription');

  const { isPending, updateDescription } = useUpdateDescription({ taskId });

  const handleSave = async () => {
    try {
      const newDescription = await updateDescription(description);

      setInitialDescription(newDescription);
      setIsEditing(false);
    } catch {
      setDescription(initialDescription);
    }
  };

  const handleOpen = () => {
    if (isManager) {
      setIsEditing(true);
    }
  };

  return (
    <>
      <Editor
        onOpen={handleOpen}
        isEditing={isEditing}
        onSave={setDescription}
        initialState={description}
        placeholder={placeholder('placeholder')}
        className={cn('min-h-[26px]', isEditing && 'mb-2', !isManager && '!cursor-default')}
      />
      {isEditing && isManager && (
        <EditorBtnGroup
          onSave={handleSave}
          isDisabled={!description || isPending}
          onCancel={() => {
            setIsEditing(false);
            setDescription(initialDescription);
          }}
        />
      )}
    </>
  );
};
