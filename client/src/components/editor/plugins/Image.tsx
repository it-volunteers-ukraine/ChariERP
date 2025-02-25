'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodes, ParagraphNode } from 'lexical';
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
          const paragraphNode = new ParagraphNode();

          $insertNodes([imageNode]);

          $insertNodes([paragraphNode]);
        });

        return true;
      },
      0,
    );
  }, []);

  return null;
};
