'use client';

import { useEffect } from 'react';
import { $getRoot, $nodesOfType } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { ImageNode } from '../node';

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

      editorState.read(() => {
        const root = $getRoot();
        const isText = root.getTextContent().trim() !== '';
        const isImages = $nodesOfType(ImageNode).length > 0;

        if (isText || isImages) {
          onChange(JSON.stringify(editorState.toJSON()));
        } else {
          onChange(null);
        }
      });
    });
  }, [editor, onChange, isEditing]);

  return null;
};
