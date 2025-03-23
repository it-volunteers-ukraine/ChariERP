'use client';

import { useCallback, useEffect, useState } from 'react';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';

import { cn } from '@/utils';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@/assets/icons';

export const TextDecoration = ({ className }: { className?: string }) => {
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
    code: false,
    italic: false,
    underline: false,
    subscript: false,
    superscript: false,
    strikethrough: false,
  });

  const [editor] = useLexicalComposerContext();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setActiveFormats({
        bold: selection.hasFormat('bold'),
        code: selection.hasFormat('code'),
        italic: selection.hasFormat('italic'),
        underline: selection.hasFormat('underline'),
        subscript: selection.hasFormat('subscript'),
        superscript: selection.hasFormat('superscript'),
        strikethrough: selection.hasFormat('strikethrough'),
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
            key={type}
            onClick={() => handleOnClick(type.toLowerCase() as TextFormatType)}
            className={cn(className, activeFormats[type.toLowerCase() as keyof typeof activeFormats] && 'bg-[#aba9a9]')}
          >
            <Icon className="h-full" />
          </button>
        );
      })}
    </>
  );
};
