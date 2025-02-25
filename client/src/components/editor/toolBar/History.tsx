import { Redo, Undo } from '@/assets/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { REDO_COMMAND, UNDO_COMMAND } from 'lexical';

export const History = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <button
        className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <Undo className="h-full" />
      </button>
      <button
        className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <Redo className="h-full" />
      </button>
    </>
  );
};
