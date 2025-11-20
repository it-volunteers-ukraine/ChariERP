'use client';

import { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { $getSelection, $isRangeSelection } from 'lexical';

import { cn } from '@/utils';
import { useOutsideClick } from '@/hooks';
import { ColorSelect } from '@/assets/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';

import { CHANGE_COLOR_COMMAND } from '../plugins/Color';

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];

interface IColorButton {
  type: 'text' | 'background';
  className?: string;
}

export const ColorButton = ({ className, type }: IColorButton) => {
  const ref = useRef<HTMLDivElement>(null);
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  const applyColor = (color: string) => {
    editor.dispatchCommand(CHANGE_COLOR_COMMAND, { type, color });
    setSelectedColor(color);
    setIsOpen(false);
    setShowPicker(false);
  };

  useOutsideClick(() => {
    applyColor(selectedColor);
  }, ref);

  const updateColor = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const color =
          type === 'text'
            ? $getSelectionStyleValueForProperty(selection, 'color', '#000000')
            : $getSelectionStyleValueForProperty(selection, 'background-color', '#FFFFFF');

        setSelectedColor(color);
      }
    });
  };

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateColor();
      });
    });
  }, [editor]);

  return (
    <div className="relative inline-block">
      <button
        className={cn(className, 'relative text-[14px]', type === 'text' ? 'items-center' : 'items-start')}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="absolute bottom-[4px] left-[50%] h-[3px] w-[70%] -translate-x-2/4"
          style={{ backgroundColor: selectedColor }}
        ></div>
        {type === 'text' ? 'A' : <ColorSelect className="h-[90%]" />}
      </button>
      {isOpen && (
        <div ref={ref} className="absolute z-10 mt-2 w-40 rounded-lg border bg-white p-2 shadow-lg">
          <div className="mb-2 grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => applyColor(color)}
                style={{ backgroundColor: color }}
                className={cn(className, 'border-black hover:scale-110')}
              ></button>
            ))}
          </div>
          {!showPicker ? (
            <button className={cn(className, 'mt-2 w-full p-2 text-sm')} onClick={() => setShowPicker(!showPicker)}>
              Вибрати колір
            </button>
          ) : (
            <div className="mt-2 flex h-7">
              <div
                style={{ backgroundColor: selectedColor }}
                className="mr-2 w-full rounded-sm p-2 hover:bg-gray-300"
              ></div>
              <button className={cn(className, 'p-2 text-center text-sm')} onClick={() => applyColor(selectedColor)}>
                Ok
              </button>
            </div>
          )}
          {showPicker && (
            <div className="absolute z-50 mt-2">
              <ChromePicker color={selectedColor} onChange={(color) => setSelectedColor(color.hex)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
