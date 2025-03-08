'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodes } from 'lexical';
import { INSERT_IMAGE_COMMAND } from '../config';

import { useEffect } from 'react';
import { ImageNode } from '../node';

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
