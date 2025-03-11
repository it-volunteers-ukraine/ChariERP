'use client';

import { useEffect } from 'react';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand } from 'lexical';

import { $setBlocksType } from '@lexical/selection';
import { HeadingTagType, $createHeadingNode } from '@lexical/rich-text';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const FORMAT_HEADING_COMMAND = createCommand('FORMAT_HEADING_COMMAND');

export const Heading = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand<HeadingTagType>(
      FORMAT_HEADING_COMMAND,
      (payload) => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(payload));
        }

        return true;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, []);

  return null;
};
