'use client';

import { useEffect } from 'react';
import { EditorState } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface IOnChange {
  onChange: (editorState: EditorState) => void;
}
export const OnChange = ({ onChange }: IOnChange) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
};
