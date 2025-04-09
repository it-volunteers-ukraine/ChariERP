'use client';

import { useEffect } from 'react';
import { $getRoot } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface IDefaultState {
  isOpen: boolean;
  initialState?: string;
}

export const RestoreState = ({ isOpen, initialState }: IDefaultState) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!isOpen) {
      if (initialState) {
        editor.update(() => {
          editor.setEditorState(editor.parseEditorState(initialState));
        });
      } else {
        editor.update(() => {
          const root = $getRoot();

          root.clear();
        });
      }
    }
  }, [isOpen, initialState]);

  return null;
};
