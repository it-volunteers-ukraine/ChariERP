import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@/assets/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { mergeRegister } from '@lexical/utils';
import { cn } from '@/utils';

export const TextDecoration = () => {
  const modifications = [
    { type: 'Bold', Icon: Bold },
    { type: 'Italic', Icon: Italic },
    { type: 'Underline', Icon: Underline },
    { type: 'Strikethrough', Icon: Strikethrough },
    { type: 'Subscript', Icon: Subscript },
    { type: 'Superscript', Icon: Superscript },
    { type: 'Code', Icon: Code },
  ];

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    subscript: false,
    superscript: false,
    code: false,
  });

  const [editor] = useLexicalComposerContext();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setActiveFormats({
        bold: selection.hasFormat('bold'),
        italic: selection.hasFormat('italic'),
        underline: selection.hasFormat('underline'),
        strikethrough: selection.hasFormat('strikethrough'),
        subscript: selection.hasFormat('subscript'),
        superscript: selection.hasFormat('superscript'),
        code: selection.hasFormat('code'),
      });
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
    );
  }, [editor, $updateToolbar]);

  const handleOnClick = (formatType: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  return (
    <>
      {modifications.map(({ type, Icon }) => {
        return (
          <button
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]',
              activeFormats[type.toLowerCase() as keyof typeof activeFormats] && 'bg-[#aba9a9]',
            )}
            onClick={() => handleOnClick(type.toLowerCase() as TextFormatType)}
            key={type}
          >
            <Icon className="h-full" />
          </button>
        );
      })}
    </>
  );
};
