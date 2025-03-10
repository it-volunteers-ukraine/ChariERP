import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState } from 'react';
import { CHANGE_COLOR_COMMAND } from '../node/color';

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];

export const ColorButton = () => {
  const [editor] = useLexicalComposerContext();
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (color: string) => {
    setSelectedColor(color);
    editor.dispatchCommand(CHANGE_COLOR_COMMAND, color);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px] underline underline-offset-4"
        style={{ color: selectedColor }}
      >
        A
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-40 rounded-lg border bg-white p-2 shadow-lg">
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleSelect(color)}
                className="h-8 w-8 rounded-full border transition hover:scale-110"
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
