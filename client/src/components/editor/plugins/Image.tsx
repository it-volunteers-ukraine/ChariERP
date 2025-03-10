'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodes } from 'lexical';

import { useEffect } from 'react';
import { ImageNode, INSERT_IMAGE_COMMAND } from '../node';

export const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = new ImageNode(payload);

        editor.update(() => {
          $insertNodes([imageNode]);
        });

        return true;
      },
      0,
    );
  }, []);

  return null;
};
