import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_HEADING_COMMAND } from '../plugins/Heading';

export const Heading = () => {
  const tags = ['h1', 'h2', 'h3', 'h4', 'h5'];

  const [editor] = useLexicalComposerContext();

  return (
    <>
      {tags.map((tag) => (
        <button
          className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
          key={tag}
          type="button"
          onClick={() => {
            editor.dispatchCommand(FORMAT_HEADING_COMMAND, tag);
          }}
        >
          {tag}
        </button>
      ))}
    </>
  );
};
