'use client';

import { useEffect } from 'react';
import { $getSelection, $isRangeSelection, createCommand } from 'lexical';

import { $patchStyleText } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const CHANGE_SIZE_COMMAND = createCommand<{ size: string }>('CHANGE_SIZE_COMMAND');

export const FontSize = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      CHANGE_SIZE_COMMAND,
      (payload) => {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, { 'font-size': payload.size });
          }
        });

        return true;
      },
      0,
    );
  }, [editor]);

  return null;
};
