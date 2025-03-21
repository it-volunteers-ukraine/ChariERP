'use client';

import { useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { FORMAT_HEADING_COMMAND } from '../plugins/Heading';

export const Heading = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tags = ['h1', 'h2', 'h3', 'h4', 'h5'];
  const [editor] = useLexicalComposerContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useOutsideClick(() => {
    setIsDropdownOpen(false);
  }, ref);

  return (
    <div className="relative">
      <button className={className} type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        T
      </button>

      {isDropdownOpen && (
        <div
          ref={ref}
          className="absolute left-0 top-full z-10 mt-1 grid w-[120px] grid-cols-3 gap-2 rounded border border-gray-200 bg-white p-2 shadow-md"
        >
          {tags.map((tag, index) => (
            <button
              key={tag}
              type="button"
              className={className}
              onClick={() => {
                editor.dispatchCommand(FORMAT_HEADING_COMMAND, tag);
                setIsDropdownOpen(false);
              }}
            >
              T<span className="align-sub text-[10px]">{index + 1}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
