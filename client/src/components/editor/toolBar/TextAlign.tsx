'use client';

import { ElementFormatType, FORMAT_ELEMENT_COMMAND, INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Indent, Outdent, TextCenter, TextJustify, TextLeft, TextRight } from '@/assets/icons';

export const TextAlign = ({ className }: { className?: string }) => {
  const modifications = [
    { type: 'Left', Icon: TextLeft },
    { type: 'Center', Icon: TextCenter },
    { type: 'Right', Icon: TextRight },
    { type: 'Justify', Icon: TextJustify },
  ];

  const [editor] = useLexicalComposerContext();

  const handleOnClick = (formatType: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType);
  };

  return (
    <>
      {modifications.map(({ type, Icon }) => (
        <button
          key={type}
          type="button"
          className={className}
          onClick={() => handleOnClick(type.toLowerCase() as ElementFormatType)}
        >
          <Icon className="h-full" />
        </button>
      ))}
      <button
        type="button"
        className={className}
        onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
      >
        <Outdent className="h-full" />
      </button>
      <button
        type="button"
        className={className}
        onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
      >
        <Indent className="h-full" />
      </button>
    </>
  );
};
