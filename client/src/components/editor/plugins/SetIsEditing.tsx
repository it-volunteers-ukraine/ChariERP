import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

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
