'use client';

import { REDO_COMMAND, UNDO_COMMAND } from 'lexical';

import { Redo, Undo } from '@/assets/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const History = ({ className }: { className?: string }) => {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <button className={className} type="button" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
        <Undo className="h-full" />
      </button>
      <button className={className} type="button" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
        <Redo className="h-full" />
      </button>
    </>
  );
};
