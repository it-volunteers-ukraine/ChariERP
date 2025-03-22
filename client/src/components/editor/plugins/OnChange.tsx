'use client';

import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface IOnChange {
  isEditing: boolean;
  onChange: (editorState: string | null) => void;
}
export const OnChange = ({ onChange, isEditing }: IOnChange) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      if (!isEditing) {
        return;
      }

      const root = editorState.read(() => editor.getRootElement());

      if (root && root.textContent && root.textContent.trim() !== '') {
        onChange(JSON.stringify(editorState.toJSON()));
      } else {
        onChange(null);
      }
    });
  }, [editor, onChange]);

  return null;
};
