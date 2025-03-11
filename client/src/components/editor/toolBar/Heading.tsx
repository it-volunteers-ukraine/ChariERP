'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { FORMAT_HEADING_COMMAND } from '../plugins/Heading';

export const Heading = ({ className }: { className?: string }) => {
  const tags = ['h1', 'h2', 'h3', 'h4', 'h5'];

  const [editor] = useLexicalComposerContext();

  return (
    <>
      {tags.map((tag) => (
        <button
          className={className}
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
