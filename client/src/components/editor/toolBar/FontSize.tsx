import React, { useEffect, useState } from 'react';
import { $getSelection, $isRangeSelection } from 'lexical';

import { cn } from '@/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';

import { CHANGE_SIZE_COMMAND } from '../plugins/FontSize';

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 40];

interface IFontSize {
  className?: string;
  isEditing?: boolean;
}

export const FontSize = ({ className, isEditing }: IFontSize) => {
  const [size, setSize] = useState<number | null>(null);
  const [editor] = useLexicalComposerContext();

  const updateSize = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const sizeNow = $getSelectionStyleValueForProperty(selection, 'font-size', '16px');
        const numericSize = parseInt(sizeNow, 10);

        setSize(isNaN(numericSize) ? null : numericSize);
      }
    });
  };

  useEffect(() => {
    applySize(16);
  }, [isEditing]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateSize();
      });
    });
  }, [editor]);

  const applySize = (newSize: number) => {
    setSize(newSize);
    editor.dispatchCommand(CHANGE_SIZE_COMMAND, { size: `${newSize}px` });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);

    applySize(newSize);
  };

  const handleIncrement = () => applySize(size ? size + 1 : 16);
  const handleDecrement = () => applySize(size ? Math.max(1, size - 1) : 16);

  return (
    <div className="flex items-center gap-2">
      <button className={cn(className)} onClick={handleDecrement} disabled={size !== null && size <= 8}>
        -
      </button>

      <select
        className={cn(className, 'border-bg-gray-300 w-14 border-[1px] px-2 text-[14px]')}
        value={size ?? ''}
        onChange={handleSizeChange}
      >
        <option value="" hidden></option>
        {FONT_SIZES.map((fontSize) => (
          <option key={fontSize} value={fontSize}>
            {fontSize}
          </option>
        ))}
        {!FONT_SIZES.includes(size ?? 0) && size !== null && (
          <option className="hidden" value={size}>
            {size}
          </option>
        )}
      </select>

      <button className={cn(className)} onClick={handleIncrement} disabled={size !== null && size >= 40}>
        +
      </button>
    </div>
  );
};
