'use client';

import { Indent, Outdent, TextCenter, TextJusify, TextLeft, TextRight } from '@/assets/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ElementFormatType, FORMAT_ELEMENT_COMMAND, INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from 'lexical';

export const TextAlign = () => {
  const modifications = [
    { type: 'Left', Icon: TextLeft },
    { type: 'Center', Icon: TextCenter },
    { type: 'Right', Icon: TextRight },
    { type: 'Justify', Icon: TextJusify },
  ];

  const [editor] = useLexicalComposerContext();

  const handleOnClick = (formatType: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType);
  };

  return (
    <>
      {modifications.map(({ type, Icon }) => (
        <button
          className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
          key={type}
          type="button"
          onClick={() => handleOnClick(type.toLowerCase() as ElementFormatType)}
        >
          <Icon className="h-full" />
        </button>
      ))}
      <button
        className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
        type="button"
        onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}
      >
        <Outdent className="h-full" />
      </button>
      <button
        className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
        type="button"
        onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
      >
        <Indent className="h-full" />
      </button>
    </>
  );
};
