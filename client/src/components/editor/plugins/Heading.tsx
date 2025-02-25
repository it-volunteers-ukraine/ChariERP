import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand } from 'lexical';
import { useEffect } from 'react';
import { HeadingTagType, $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';

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
