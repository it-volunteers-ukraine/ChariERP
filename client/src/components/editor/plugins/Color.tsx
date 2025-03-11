'use client';

import { useEffect } from 'react';
import { $getSelection, $isRangeSelection, createCommand } from 'lexical';

import { $patchStyleText } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const CHANGE_COLOR_COMMAND = createCommand<{ type: 'text' | 'background'; color: string }>(
  'CHANGE_COLOR_COMMAND',
);

export const Color = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      CHANGE_COLOR_COMMAND,
      (payload) => {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            if (payload.type === 'text') {
              $patchStyleText(selection, { color: payload.color });
            } else if (payload.type === 'background') {
              $patchStyleText(selection, { 'background-color': payload.color });
            }
          }
        });

        return true;
      },
      0,
    );
  }, [editor]);

  return null;
};
