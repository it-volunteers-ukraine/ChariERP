'use client';

import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface ISetIsEditing {
  isEditing: boolean;
}

export const SetIsEditing = ({ isEditing }: ISetIsEditing) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(isEditing);
  }, [isEditing]);

  return null;
};
