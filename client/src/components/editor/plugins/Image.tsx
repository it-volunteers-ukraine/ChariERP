'use client';

import { useEffect } from 'react';
import { $insertNodes, TextNode } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { ImageNode, INSERT_IMAGE_COMMAND } from '../node';

export const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = new ImageNode(payload);
        const textNode = new TextNode(' ');

        editor.update(() => {
          $insertNodes([imageNode]);
          $insertNodes([textNode]);
        });

        return true;
      },
      0,
    );
  }, []);

  return null;
};
